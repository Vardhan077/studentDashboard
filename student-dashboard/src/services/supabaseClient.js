import { createClient } from '@supabase/supabase-js';

const NEXT_PUBLIC_SUPABASE_URL = "https://vvkcbgygwuvtiuhfnesc.supabase.co";
const NEXT_PUBLIC_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2a2NiZ3lnd3V2dGl1aGZuZXNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MzcxOTAsImV4cCI6MjA1MDExMzE5MH0.F4ToOAuBByy6lge9lAsOXbRsjqqqcmUvgwVXxdO0nnY";

// Supabase client setup
const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default supabase