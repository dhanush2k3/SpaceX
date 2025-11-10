

export async function exchangeCodeForToken(code: string,verifier:string ): Promise<string | null> {
  
  if (!verifier) {
    console.error('Missing code verifier');
    return null;  
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: '6389c0b253bf40938d767d188caacaa3',
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'melofy://callback',
      code_verifier: verifier,
    }).toString(),
  });

  const tokenData = await response.json();

  return tokenData.access_token || null;

}