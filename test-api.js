const fetch = globalThis.fetch;

async function runSmokeTest() {
  const targetUrl = "https://learnmind.aboywithacam.workers.dev/api/reserve";
  const payload = {
    email: "api-test-worker@student.com",
    source: "CLI_SMOKE_TEST"
  };

  console.log("🚀 Starting Edge API Integration Smoke Test...");
  console.log(`📡 Pinging Endpoint: ${targetUrl}`);
  console.log("📦 Payload:", JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    console.log(`\n📊 Response Status: ${response.status} ${response.statusText}`);
    
    const responseText = await response.text();
    console.log("📝 Server Response:", responseText);

    if (response.ok) {
      console.log("\x1b[32m%s\x1b[0m", "\n✅ API SUCCESS: Payload delivered to Cloudflare. Check the Firebase 'reservations' collection now!");
    } else {
      console.log("\x1b[31m%s\x1b[0m", `\n❌ API FAILURE: Server returned an error code. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", "\n❌ API ERROR: Connection failed entirely!");
    console.error(error);
  }
}

runSmokeTest();
