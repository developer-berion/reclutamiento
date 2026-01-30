import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cnkwnynujtyfslafsmug.supabase.co'
const supabaseAnonKey = 'sb_publishable_SKKb9KgN3-cx8irSI_vbcg_UZItVftC'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
