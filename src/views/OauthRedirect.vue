<template>
  <div><button @click="redirectToAuthorization">Authorization Code Request</button></div>
</template>

<script lang="ts" setup>
import { buildPKCE, generateRandomString } from '@/utils/oauth';

async function redirectToAuthorization() {
  const state = generateRandomString(40);
  const { codeVerifier, codeChallenge } = await buildPKCE();
  localStorage.setItem('pkce_state', state);
  localStorage.setItem('pkce_code_verifier', codeVerifier);
  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_OAUTH_CLIENT_ID!,
    redirect_uri: 'http://localhost:5173/callback',
    response_type: 'code',
    scope: '',
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  window.location.href = `http://127.0.0.1:8000/oauth/authorize?${params.toString()}`;
}
</script>
