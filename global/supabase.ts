import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SB_PROJECT_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SP_API_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const supabaseBucket = supabaseUrl + '/storage/v1/object/public/';
export const supabaseBucketImg = supabaseBucket + 'images/';
