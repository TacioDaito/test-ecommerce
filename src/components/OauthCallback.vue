<template>
  <div><button @click="handleOAuthCallback">Acess Token Request</button></div>
  <div>
    <p v-if="access_token">Access Token Received: {{ access_token }}</p>
    <p v-else>Waiting for Acess Token...</p>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref } from 'vue';
const access_token = ref<string | null>(null);
async function handleOAuthCallback() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const state = urlParams.get('state');
  const savedState = localStorage.getItem('pkce_state');
  const codeVerifier = localStorage.getItem('pkce_code_verifier');
  if (!savedState || state !== savedState) {
    throw new Error('Invalid OAuth state.');
  }
    const token_response = await axios.post('http://127.0.0.1:8000/oauth/token', {
    grant_type: 'authorization_code',
    client_id: import.meta.env.VITE_OAUTH_CLIENT_ID!,
    redirect_uri: 'http://localhost:5173',
    code_verifier: codeVerifier,
    code: code,
  });
  access_token.value = JSON.stringify(token_response.data, null, 2);
  localStorage.removeItem('pkce_state');
  localStorage.removeItem('pkce_code_verifier');

}
</script>
