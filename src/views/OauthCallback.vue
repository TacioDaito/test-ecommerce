<template>
  <div><button @click="handleOAuthCallback">Acess Token Request</button></div>
</template>

<script lang="ts" setup>
import axios from 'axios';
async function handleOAuthCallback() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const state = urlParams.get('state');
  const savedState = localStorage.getItem('pkce_state');
  const codeVerifier = localStorage.getItem('pkce_code_verifier');
  if (!savedState || state !== savedState) {
    throw new Error('Invalid OAuth state.');
  }
  const tokenResponse = await axios.post('http://127.0.0.1:8000/oauth/token', {
    grant_type: 'authorization_code',
    client_id: import.meta.env.VITE_OAUTH_CLIENT_ID!,
    redirect_uri: 'http://localhost:5173/callback',
    code_verifier: codeVerifier,
    code: code,
  });
  console.log('Token Response:', tokenResponse.data);
  // Example: save token in localStorage/session or Vuex/Pinia store
  // localStorage.setItem('access_token', tokenResponse.data.access_token);
}
</script>
