
// Supabase Configuration for Admin Page (admin2 project)
const SUPABASE_URL = 'https://uplbvrzpjmojedavsegh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwbGJ2cnpwam1vamVkYXZzZWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NTczNzQsImV4cCI6MjA4NDEzMzM3NH0.U80he1366RHG_Ye7DIBf72RGZXGv60yTsg5z-XYCTgg';

// IMPORTANT: GYM SELECTION
// This ID determines which gym's data is shown.
// Replace this with the specific Gym's ID when deploying to a new client.
const CURRENT_GYM_ID = 'c070cf68-8c53-4e1a-81d0-4b64cc120a9a'; // Default: 네오핏 강남점
// const CURRENT_GYM_ID = '1db04e83-06d5-4d10-b27c-3c70f8a31f47'; // Alternative: 네오핏 부산점

// Initialize Supabase Client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("Supabase Client Initialized. Gym ID:", CURRENT_GYM_ID);
