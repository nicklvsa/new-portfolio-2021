import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getEnv } from './sharedFuncs';
import { Nullable } from './sharedModels';

let SUPABASE_CLIENT: Nullable<SupabaseClient> = null;

export const getSupabaseClient = (): SupabaseClient => {
    if (!SUPABASE_CLIENT) {
        const url = getEnv<string>('SUPABASE_CLIENT_URL');
        const key = getEnv<string>('SUPABASE_ANON_KEY');

        SUPABASE_CLIENT = createClient(url, key);
    }

    return SUPABASE_CLIENT;
};