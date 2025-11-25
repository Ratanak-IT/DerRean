"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Pencil, Camera, Loader2, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

interface UserProfile {
  id: string;
  full_name: string;
  email: string | null;
  bio: string;
  avatar_url: string | null;
  cover_url: string | null;
}

export default function AccountPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<UserProfile | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [previewCover, setPreviewCover] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const coverInputRef = useRef<HTMLInputElement>(null);

  // Load profile from Supabase
  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiless")
        .select("id, full_name, email, bio, avatar_url, cover_url")
        .eq("id", user.id)
        .single();

      if (error && error.code === "PGRST116") {
        const newProfile: UserProfile = {
          id: user.id,
          full_name: "",
          email: user.email ?? null,
          bio: "",
          avatar_url: null,
          cover_url: null,
        };
        await supabase.from("profiless").insert(newProfile);
        setProfile(newProfile);
        setFormData(newProfile);
      } else if (data) {
        setProfile(data as UserProfile);
        setFormData(data as UserProfile);
      }

      setIsLoading(false);
    };

    loadProfile();
  }, []);

  // Input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  // Avatar file change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewAvatar(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Cover file change
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewCover(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Upload image (avatar or cover) to same bucket
  const uploadImage = async (
    userId: string,
    file: File,
    type: "avatar" | "cover"
  ): Promise<string | null> => {
    if (!file) return null;
    const fileExt = file.name.split(".").pop() || "jpg";
    const fileName = `${userId}/${type}_${Date.now()}.${fileExt}`;

    // Delete old file if exists
    const oldPath =
      type === "avatar" ? profile?.avatar_url : profile?.cover_url;
    if (oldPath && oldPath.includes(userId)) {
      await supabase.storage
        .from("avatars")
        .remove([oldPath])
        .catch(() => {});
    }

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, { upsert: true });

    if (error) {
      console.error(`Failed to upload ${type}:`, error.message);
      return null;
    }

    return data.path;
  };

  // Save profile
  const handleSave = async () => {
    if (!formData || !profile) return;
    setIsSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Upload new images if changed
    let avatarPath = profile.avatar_url;
    let coverPath = profile.cover_url;

    if (avatarFile) {
      const uploadedAvatar = await uploadImage(user.id, avatarFile, "avatar");
      if (uploadedAvatar) avatarPath = uploadedAvatar;
    }

    if (coverFile) {
      const uploadedCover = await uploadImage(user.id, coverFile, "cover");
      if (uploadedCover) coverPath = uploadedCover;
    }

    // Update table
    const updates = {
      full_name: formData.full_name.trim(),
      bio: formData.bio.trim(),
      avatar_url: avatarPath,
      cover_url: coverPath,
      updated_at: new Date(),
    };

    const { error } = await supabase
      .from("profiless")
      .update(updates)
      .eq("id", user.id);

    if (!error) {
      const updatedProfile = {
        ...formData,
        avatar_url: avatarPath,
        cover_url: coverPath,
      };
      setProfile(updatedProfile);
      setFormData(updatedProfile);
      setPreviewAvatar(null);
      setPreviewCover(null);
      setAvatarFile(null);
      setCoverFile(null);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } else {
      console.error("Failed to update profile:", error.message);
      toast.error("Failed to save profile.");
    }

    setIsSaving(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData(profile);
    setPreviewAvatar(null);
    setPreviewCover(null);
    setAvatarFile(null);
    setCoverFile(null);
    setIsEditing(false);
  };

  // Get public URL
  const getPublicUrl = (path: string | null) => {
    if (!path) return null;
    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    return data.publicUrl;
  };

  const coverUrl =
    previewCover ||
    (profile?.cover_url ? getPublicUrl(profile.cover_url) : null);
  const avatarUrl: string =
    previewAvatar ||
    (profile?.avatar_url ? getPublicUrl(profile.avatar_url) : "") ||
    "/default-avatar.png";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600 dark:text-indigo-400" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-500 dark:text-gray-400">
        Please sign in to view your profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 px-4 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="font-medium hover:opacity-80 flex items-center gap-2"
          >
            Back
          </button>
          <h1 className="text-2xl font-bold">Account Settings</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-xl">
          {/* Cover Photo */}
          <div className="relative h-64 bg-gray-200 dark:bg-gray-700">
            {coverUrl ? (
              <Image src={coverUrl} alt="Cover" fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500" />
            )}

            {/* Change Cover */}
            {isEditing && (
              <>
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-all duration-200 text-white font-semibold text-lg"
                >
                  <div className="flex flex-col items-center">
                    <ImageIcon size={40} className="mb-2" />
                    Change Cover Photo
                  </div>
                </button>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                  className="hidden"
                />
              </>
            )}

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute top-4 right-4 bg-white/30 backdrop-blur hover:bg-white/40 text-white p-3 rounded-xl shadow-lg"
              >
                <Pencil size={24} />
              </button>
            )}
          </div>

          {/* Profile Content */}
          <div className="px-8 pb-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-8 -mt-20 mb-8">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-40 h-40 rounded-2xl border-8 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 overflow-hidden shadow-2xl ring-4 ring-gray-50 dark:ring-gray-900">
                  <Image
  src={avatarUrl || "/default-avatar.png"}
  alt="Avatar"
  width={160}
  height={160}
  className="w-full h-full object-cover"
/>
                </div>
                {isEditing && (
                  <label className="absolute bottom-3 right-3 bg-indigo-600 text-white p-3 rounded-xl cursor-pointer hover:scale-110 transition shadow-lg">
                    <Camera size={24} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="flex-1 pb-4">
                {isEditing ? (
                  <input
                    type="text"
                    name="full_name"
                    value={formData?.full_name || ""}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="text-3xl font-bold bg-transparent border-b-2 border-indigo-600 focus:outline-none w-full px-2 py-1"
                  />
                ) : (
                  <h2 className="text-3xl font-bold">
                    {profile.full_name || "Set your name"}
                  </h2>
                )}
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  {profile.email}
                </p>
              </div>
            </div>

            {/* Edit Mode */}
            {isEditing ? (
              <div className="space-y-6 mt-10">
                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData?.bio || ""}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profile.email || ""}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-600 cursor-not-allowed"
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {isSaving ? <>Saving...</> : "Save Changes"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 border border-gray-300 dark:border-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-10">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                  About Me
                </h3>
                <p className="text-lg leading-relaxed whitespace-pre-wrap">
                  {profile.bio || "No bio yet. Click Edit to add one!"}
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 shadow-md"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
