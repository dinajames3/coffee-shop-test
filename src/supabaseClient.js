import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug: Log all VITE_ keys found (not values)
const envKeys = Object.keys(import.meta.env).filter(key => key.startsWith('VITE_'));
console.log('Detected VITE_ environment keys:', envKeys);

if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your_supabase_url' || supabaseUrl.includes('placeholder')) {
    console.error('Supabase URL or Key is missing or default! Detected keys:', envKeys);
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseKey || 'placeholder'
);
