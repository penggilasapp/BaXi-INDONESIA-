/**
 * Real User Profile Storage & Management
 * BaZi by PENGGILAS
 * 
 * Replaces dummy presets with genuine user-saved profile management.
 * Persists user charts locally without external trackers or mock celebrity profiles.
 */

export interface UserSavedProfile {
  id: string;
  name: string;
  birthDate: string;
  birthTime: string;
  gender: 'male' | 'female';
  timezone: string;
  createdAt: number;
}

const STORAGE_KEY = 'bazi_penggilas_saved_profiles';

/**
 * Retrieve saved profiles from localStorage
 */
export function getSavedProfiles(): UserSavedProfile[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.warn('Gagal memuat profil tersimpan:', err);
    return [];
  }
}

/**
 * Save a new profile to localStorage
 */
export function saveProfile(
  data: Omit<UserSavedProfile, 'id' | 'createdAt'>
): UserSavedProfile {
  const existing = getSavedProfiles();
  const newProfile: UserSavedProfile = {
    ...data,
    id: `profile_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    createdAt: Date.now(),
  };

  // Add at the beginning
  const updated = [newProfile, ...existing.filter((p) => p.name !== data.name)];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Gagal menyimpan profil:', err);
  }
  return newProfile;
}

/**
 * Delete a profile by ID
 */
export function deleteProfile(id: string): UserSavedProfile[] {
  const existing = getSavedProfiles();
  const updated = existing.filter((p) => p.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Gagal menghapus profil:', err);
  }
  return updated;
}

export interface AppBackupBundle {
  appName: string;
  version: string;
  exportedAt: string;
  timestamp: number;
  totalProfiles: number;
  profiles: UserSavedProfile[];
}

/**
 * Export all saved profiles and app settings into a structured JSON backup
 */
export function exportAllAppDataAsJson(): string {
  const profiles = getSavedProfiles();
  const bundle: AppBackupBundle = {
    appName: 'BaZi by PENGGILAS',
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    timestamp: Date.now(),
    totalProfiles: profiles.length,
    profiles,
  };
  return JSON.stringify(bundle, null, 2);
}

/**
 * Trigger browser download for the JSON backup file
 */
export function downloadBackupFile(): void {
  const jsonContent = exportAllAppDataAsJson();
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const dateStr = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.setAttribute('download', `BaZi_PENGGILAS_Semua_Data_${dateStr}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Restore / Import profiles from a JSON backup string
 */
export function importAppDataFromJson(jsonString: string): {
  success: boolean;
  importedCount: number;
  message: string;
} {
  try {
    const parsed = JSON.parse(jsonString);
    let incomingProfiles: UserSavedProfile[] = [];

    if (Array.isArray(parsed)) {
      incomingProfiles = parsed;
    } else if (parsed && Array.isArray(parsed.profiles)) {
      incomingProfiles = parsed.profiles;
    } else {
      return {
        success: false,
        importedCount: 0,
        message: 'Format file tidak sesuai standar cadangan BaZi by PENGGILAS.',
      };
    }

    if (incomingProfiles.length === 0) {
      return {
        success: false,
        importedCount: 0,
        message: 'Tidak ada profil yang ditemukan dalam file cadangan.',
      };
    }

    const currentProfiles = getSavedProfiles();
    const existingIds = new Set(currentProfiles.map((p) => p.id));
    const existingNames = new Set(currentProfiles.map((p) => p.name));

    let addedCount = 0;
    const merged = [...currentProfiles];

    for (const p of incomingProfiles) {
      if (p.name && p.birthDate) {
        // Avoid duplicate ID or exact name conflict by generating fresh ID if needed
        const profileToAdd: UserSavedProfile = {
          ...p,
          id: existingIds.has(p.id) ? `imported_${Date.now()}_${Math.random().toString(36).substr(2, 5)}` : p.id,
          createdAt: p.createdAt || Date.now(),
        };
        // Replace or prepend
        const existingIdx = merged.findIndex((m) => m.name === p.name);
        if (existingIdx >= 0) {
          merged[existingIdx] = profileToAdd;
        } else {
          merged.unshift(profileToAdd);
        }
        addedCount++;
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return {
      success: true,
      importedCount: addedCount,
      message: `Berhasil mengimpor ${addedCount} profil ke perangkat Anda.`,
    };
  } catch (err: any) {
    return {
      success: false,
      importedCount: 0,
      message: `Gagal membaca file: ${err.message || 'JSON tidak valid'}`,
    };
  }
}
