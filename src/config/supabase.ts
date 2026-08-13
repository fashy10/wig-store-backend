import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

const BUCKET = 'wig-photos';

// The client is created lazily (on first use) rather than immediately when
// this file loads. This matters because .env variables aren't available
// yet at the moment NestJS first imports this file - creating the client
// too early would try to connect before SUPABASE_URL is actually set.
let supabase: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!supabase) {
    supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY,
    );
  }
  return supabase;
}

// Takes the raw file buffer from the upload form and sends it to Supabase
// Storage, which stores the image and hands back a permanent public URL
// to save in the database.
export async function uploadImageBuffer(buffer: Buffer): Promise<string> {
  const client = getSupabaseClient();
  const fileName = `${randomUUID()}.jpg`;

  const { error } = await client.storage
    .from(BUCKET)
    .upload(fileName, buffer, { contentType: 'image/jpeg' });

  if (error) throw error;

  const { data } = client.storage.from(BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
}
