import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://opqfaqxykoxrffxpqipw.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wcWZhcXh5a294cmZmeHBxaXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NTEwNzEsImV4cCI6MjA4NzAyNzA3MX0.U_S45Z-DKX_qDoOcXe1jK9lmtEQRCTUdlened2Uj3pk';

// Debug: Log all VITE_ keys found (not values)
const envKeys = Object.keys(import.meta.env).filter(key => key.startsWith('VITE_'));
console.log('Detected VITE_ environment keys:', envKeys);

if (!import.meta.env.VITE_SUPABASE_URL) {
    console.warn('VITE_SUPABASE_URL missing from environment. Using hardcoded fallback.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
