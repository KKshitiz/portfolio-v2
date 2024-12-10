export default function Home() {
  return (
    <section className="hero text-center my-10">
      <h1 className="text-6xl font-extrabold mb-6">
        Hi {"I'm "}
        <span className="bg-red-500 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Kshitiz
        </span>
      </h1>
      <p className="text-lg text-gray-400 font-semibold">
        Flutter developer, blogger, sharing interesting stuff.
      </p>
    </section>
  );
}
