


const SERVERURL = import.meta.env.VITE_SERVER_URL

export async function refreshToken(): Promise<{success: boolean}> {
  const data = await fetch(`${SERVERURL}/user/refresh-session`, {
      method: "GET",
      credentials: "include",
  })
  if(data.status == 200) {
    return {success: true}
  } else {
    return {success: false}
  }
}
