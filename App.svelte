<script>
  import { onMount } from "svelte";
  import { userStore } from "./stores.js";

  //$userStore = { id: 5, name: "Vasia1", surname: "Pupkins!!" };
  console.log("!!@!@!", $userStore);
</script>


{$userStore.name}

