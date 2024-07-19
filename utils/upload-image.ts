"use server";

import { cookies } from "next/headers";

import { createClient } from "./supabase/server";

export const uploadImage = async (
  file: File,
  filePath: string,
  bucket: string
) => {
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);

  // upload image
  const { data } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, { upsert: true, contentType: "image/png" });

  const { data: url } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return { ...data, publicUrl: url.publicUrl };
};

export const updateImage = async (
  file: File,
  filePath: string,
  bucket: string
) => {
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);

  // update image
  const { data } = await supabase.storage
    .from(bucket)
    .update(filePath, file, { upsert: true, cacheControl: "30" });

  const { data: url } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return { ...data, publicUrl: url.publicUrl };
};
