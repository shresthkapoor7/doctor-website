import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ngqlkfvxuxyfjigxilfn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ncWxrZnZ4dXh5ZmppZ3hpbGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MjA0ODgsImV4cCI6MjA3NTE5NjQ4OH0.DdQF_d_vL7xWo_iqo-6JpsOYAjIwo4zQ9nu22A04DrI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
