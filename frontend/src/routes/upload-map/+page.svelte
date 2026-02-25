<script>
  let file;

  async function uploadFile() {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:3000/upload-map', {
        method: 'POST',
        body: formData
      });

      const data = await res.text();
      alert(data);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  }
</script>

<main class="flex flex-col justify-start gap-5 items-center h-screen w-screen">
  <div class="w-full flex flex-col items-start h-30" >
    <h1>File Upload</h1>
  </div>
  <input class="bg-black text-centert text-white rounded-md py-2 px-3" type="file" on:change="{e => file = e.target.files[0]}" />
  <button class="bg-black text-white rounded-md py-2 px-3" on:click={uploadFile}>Upload</button>
</main>


