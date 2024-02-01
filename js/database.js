import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Create a single supabase client for interacting with your database
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzcnlobW9qeXRqeWxwendyd3d0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNDE4ODE1MywiZXhwIjoyMDE5NzY0MTUzfQ.H36_xRW-p4l6owbHsF2Zq8XFt05MQ51N_3Nw3MOZiig";
const supabaseUrl = "https://lsryhmojytjylpzwrwwt.supabase.co";
const supabase = createClient(supabaseUrl, supabaseKey);


export {
    supabase
}