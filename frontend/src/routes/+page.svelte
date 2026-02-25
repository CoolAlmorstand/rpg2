<script>
  import { goto } from '$app/navigation';

  function goToPage() {
    goto('/upload-map');
  }
</script>

<main>
  <button on:click={goToPage}>Go to /page</button>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  button {
    padding: 1rem 2rem;
    font-size: 1.2rem;
    background-color: black;
    color: white;
    cursor: pointer;
  }
</style>
