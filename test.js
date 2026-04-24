async function test() {
  console.log("Starting fetch...");
  try {
    const res = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: "Hello" })
    });
    console.log("Status:", res.status);
    const data = await res.json();
    console.log("Data:", JSON.stringify(data));
  } catch(e) {
    console.error("Error:", e);
  }
}
test();
