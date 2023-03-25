import { component$, Slot } from "@builder.io/qwik";

import Header from "~/components/starter/header/header";
import Footer from "~/components/starter/footer/footer";

export default component$(() => {
  return (
    <div class="fixed w-full h-full bg-gradient-to-r from-cyan-700 to-purple-700 overflow-auto">
      <main class="w-full md: max-w-xl m-auto">
        <Header />
        <Slot />
      </main>
      <div class="section dark">
        <div class="container">
          <Footer />
        </div>
      </div>
    </div>
  );
});
