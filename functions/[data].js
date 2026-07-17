export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    
    const base = url.searchParams.get('base');
    const table = url.searchParams.get('table');
    
    if (!base || !table) {
        return new Response(JSON.stringify({ error: '缺少参数' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
    const token = 'patK0gWbJHzEmJ8fr.7eda49e20d2d193c9cacabb8bc340a38f762a9cbb0f94aebb4f4130efe14a820';
    
    const airtableUrl = `https://api.airtable.com/v0/${base}/${table}`;
    
    const headers = new Headers();
    headers.set('Authorization', `Bearer ${token}`);
    
    try {
        const response = await fetch(airtableUrl, { headers });
        const data = await response.json();
        
        const newHeaders = new Headers(response.headers);
        newHeaders.set('Access-Control-Allow-Origin', '*');
        newHeaders.set('Content-Type', 'application/json');
        
        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: newHeaders
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}