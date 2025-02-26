import { createClient } from "@supabase/supabase-js";
import environment from "../environment.js";

const supabaseClient = createClient(
  environment.SUPABASE_URL,
  environment.SUPABASE_SERVICE_ROLE_KEY!
);

export default supabaseClient;
