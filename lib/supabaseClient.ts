import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY as string;

if (!supabaseUrl || !supabaseSecretKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseSecretKey, {
  auth: { persistSession: false },
  global: {
    fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }),
  },
});
