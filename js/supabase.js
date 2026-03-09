// ============================================
// SUPABASE MAIN CONFIGURATION
// ============================================

const SUPABASE_URL = 'https://eyigxuzyciytohrclugy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5aWd4dXp5Y2l5dG9ocmNsdWd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMzA4ODgsImV4cCI6MjA4ODYwNjg4OH0.-l10eOlJR4M5SXcq-Qlo9Ga1tDJkVZkM-9VczcOhDyg';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// SITE SETTINGS
// ============================================
async function getSiteSettings() {
    try {
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .eq('id', 1)
            .single();
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error loading settings:', error);
        return {
            site_name: 'TechVaultZone',
            site_description: 'Your trusted source for honest tech reviews',
            amazon_tag: 'techvaultzone-20',
            contact_email: 'techvault993@gmail.com',
            social_links: {
                youtube: 'https://youtube.com/@TechVautZone',
                instagram: 'https://instagram.com/techv_ault',
                facebook: 'https://facebook.com/profile.php?id=61585092247422',
                pinterest: 'https://pinterest.com/techvaultzone',
                tiktok: 'https://tiktok.com/@techvaultzone'
            }
        };
    }
}