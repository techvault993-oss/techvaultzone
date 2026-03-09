// ============================================
// SUPABASE CONFIGURATION - DO NOT CHANGE
// ============================================

const SUPABASE_CONFIG = {
    url: 'https://eyigxuzyciytohrclugy.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5aWd4dXp5Y2l5dG9ocmNsdWd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMzA4ODgsImV4cCI6MjA4ODYwNjg4OH0.-l10eOlJR4M5SXcq-Qlo9Ga1tDJkVZkM-9VczcOhDyg'
};

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);

// ============================================
// IMAGE UPLOAD FUNCTIONS
// ============================================

async function uploadImageToSupabase(file) {
    try {
        const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '-')}`;
        
        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            });
        
        if (error) throw error;
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(fileName);
        
        return publicUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
}

async function uploadMultipleImages(files) {
    const urls = [];
    for (let file of files) {
        const url = await uploadImageToSupabase(file);
        if (url) urls.push(url);
    }
    return urls;
}

// ============================================
// PRODUCT DATABASE FUNCTIONS
// ============================================

async function saveProductToSupabase(product) {
    try {
        const { data, error } = await supabase
            .from('products')
            .insert([product])
            .select();
        
        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error saving to Supabase:', error);
        return { success: false, error };
    }
}

async function getProductsFromSupabase() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error loading from Supabase:', error);
        return [];
    }
}

async function deleteProductFromSupabase(id) {
    try {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error deleting from Supabase:', error);
        return false;
    }
}
