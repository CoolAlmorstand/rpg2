<script lang="ts">
  import type { IApiUserLoginRequest, IApiUserLoginResponse, IApiUserCreateAccountRequest, IApiUserCreateAccountResponse} from "@terabithia/shared-types"

  import Logo from "$lib/components/ui/Logo.svelte";
  import LoadingDialog from "$lib/components/ui/LoadingDialog.svelte";
  import { goto } from "$app/navigation"

  const SERVERURL = import.meta.env.VITE_SERVER_URL

  type ITab = "signin" | "signup"
  let tab: ITab = $state("signin")
  let loadingScreen: LoadingDialog;

  let loginUsername = $state("")
  let loginPassword = $state("")

  let signupUsername = $state("")
  let signupPassword = $state("")
  let signupConfirmPassword = $state("")

  function switchTab(newTab: ITab) {
    tab = newTab
  }

  async function handleLogin() {
    if (!loginUsername) return alert("username is empty")
    if (!loginPassword) return alert("password is empty")

    const accountDetails: IApiUserLoginRequest = {
      username: loginUsername,
      password: loginPassword
    }
    
    try {
      loadingScreen.open()

      const response = await fetch(`${SERVERURL}/user/login-account`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accountDetails)
      })

      loadingScreen.close()
      const authResponse: IApiUserLoginResponse = await response.json()
      console.log(authResponse)

      if (!authResponse.success) {
        alert(authResponse.error!.reason)
        return
      }
 
      alert(`welcome back ${authResponse.username}`)
      goto("/main-menu")
    } catch (error) {
      alert(error)
    }
  }

  async function handleSignup() {
    if (!signupUsername) return alert("username is empty")
    if (signupPassword.length < 6) return alert("password must be at least 6 characters")
    if (signupPassword !== signupConfirmPassword) return alert("passwords did not match")

    const accountDetails: IApiUserCreateAccountRequest = {
      username: signupUsername,
      password: signupPassword
    }
    
    try {
      loadingScreen.open()
      const response = await fetch(`${SERVERURL}/user/create-account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accountDetails)
      })
      loadingScreen.close()
      const authResponse: IApiUserCreateAccountResponse = await response.json()
      console.log(authResponse)

      if (!authResponse.success) {
        alert(authResponse.error!.reason)
        return
      }

      alert("successfully created your account please log in") 
      tab = "signin" 
    } catch(error) {
      alert("something went wrong try again later")
    }

  }
</script>

<div class="w-full h-full pt-2 gap-2 bg-[#fdf8d4] overflow-hidden flex flex-col justify-start items-center">

  <Logo />

  <div class="flex flex-row gap-0 w-[90%] max-w-sm">
    <button
      onclick={() => switchTab("signin")}
      class="flex-1 py-2 font-['Pixelify_Sans'] font-bold rounded-tl-md rounded-bl-md border border-[#9B7653] {tab === 'signin' ? 'bg-[#9B7653] text-white' : 'bg-transparent text-[#9B7653]'}"
    >Login</button>
    <button
      onclick={() => switchTab("signup")}
      class="flex-1 py-2 font-['Pixelify_Sans'] font-medium rounded-tr-md rounded-br-md border border-[#9B7653] {tab === 'signup' ? 'bg-[#9B7653] text-white' : 'bg-transparent text-[#9B7653]'}"
    >Sign Up</button>
  </div>

  <div class="w-[90%] max-w-sm flex flex-col gap-4 p-6">
    {#if tab === "signin"}
      <div>
        <p class="font-['Pixelify_Sans'] text-[#9B7653] text-xl font-bold mb-4">Welcome back</p>
        <div class="flex flex-col gap-3">
          <input bind:value={loginUsername} type="text" placeholder="Username"
            class="w-full outline-none px-3 py-2 text-[#9B7653] border border-[#9B7653] font-['Pixelify_Sans'] rounded-md bg-transparent placeholder:text-[#9B7653]/50" />
          <input bind:value={loginPassword} type="password" placeholder="Password"
            class="w-full outline-none px-3 py-2 text-[#9B7653] border border-[#9B7653] font-['Pixelify_Sans'] rounded-md bg-transparent placeholder:text-[#9B7653]/50" />
          <button onclick={handleLogin}
            class="w-full bg-[#9B7653] text-white py-2 px-3 rounded-md font-['Pixelify_Sans'] font-medium mt-1">Login</button>
        </div>
      </div>
    {:else}
      <div>
        <p class="font-['Pixelify_Sans'] text-[#9B7653] text-xl font-bold mb-4">Create account</p>
        <div class="flex flex-col gap-3">
          <input bind:value={signupUsername} type="text" placeholder="Username"
            class="w-full outline-none px-3 py-2 text-[#9B7653] border border-[#9B7653] font-['Pixelify_Sans'] rounded-md bg-transparent placeholder:text-[#9B7653]/50" />
          <input bind:value={signupPassword} type="password" placeholder="Password"
            class="w-full outline-none px-3 py-2 text-[#9B7653] border border-[#9B7653] font-['Pixelify_Sans'] rounded-md bg-transparent placeholder:text-[#9B7653]/50" />
          <input bind:value={signupConfirmPassword} type="password" placeholder="Confirm Password"
            class="w-full outline-none px-3 py-2 text-[#9B7653] border border-[#9B7653] font-['Pixelify_Sans'] rounded-md bg-transparent placeholder:text-[#9B7653]/50" />
          <button onclick={handleSignup}
            class="w-full bg-[#9B7653] text-white py-2 px-3 rounded-md font-['Pixelify_Sans'] font-medium mt-1">Create Account</button>
        </div>
      </div>
    {/if}
  </div>
  <LoadingDialog bind:this={loadingScreen} message="Contacting Server" subMessage="Please wait" />
</div> 
