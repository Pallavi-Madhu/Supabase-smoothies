import { createClient } from '@supabase/supabase-js'

// Replace with your actual project URL and anon key
const supabase = createClient(
  'https://hnwontuxnscdddilzdtt.supabase.co',  // Your Supabase project URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhud29udHV4bnNjZGRkaWx6ZHR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5NzUxODgsImV4cCI6MjA1MTU1MTE4OH0.jtnKjIpgbRTJUfKDigcsqTjw9MBjumuePVUHpV1F8s4'  // Your Supabase anon key
)

export default supabase
