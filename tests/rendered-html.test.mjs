import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Hair Unlimited homepage and booking links", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Hair Unlimited of Denver/);
  assert.match(html, /Look like/);
  assert.match(html, /rel="icon"/);
  assert.match(html, /hu-lettermark-gothic-final\.svg/);
  assert.match(html, /class="home-loader"/);
  assert.match(html, /2025/);
  assert.match(html, /rock-band-1989-hover\.gif/);
  assert.match(html, /href="\/book"/);
  assert.match(html, /href="\/clients"/);
  assert.match(html, /href="\/faq"/);
  assert.match(html, /href="\/results"/);
  assert.ok(html.indexOf("Jesse") < html.indexOf("Crysta"));
});

test("server-renders the new-client consultation flow", async () => {
  const response = await render("/book");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Book a Private Consultation/);
  assert.match(html, /Start with a/);
  assert.match(html, /What brings you in\?/);
  assert.match(html, /Hair loss is new/);
  assert.match(html, /Explore your options/);
  assert.match(html, /Studio manager/);
  assert.doesNotMatch(html, /Stylist/);
  assert.match(html, /No appointment data is saved or sent/);
});

test("server-renders the FAQ page", async () => {
  const response = await render("/faq");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Hair System Questions/);
  assert.match(html, /Ask/);
  assert.match(html, /What is non-surgical hair replacement\?/);
  assert.match(html, /Can I shower, work out or swim in it\?/);
  assert.match(html, /Draft content for studio review/);
  assert.match(html, /href="\/book"/);
});

test("server-renders the full transformation portfolio with Jesse first", async () => {
  const response = await render("/results");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Client Transformations/);
  assert.match(html, /Eight clients/);
  assert.match(html, /View Jesse&#x27;s transformation larger/);
  assert.match(html, /View Roxy&#x27;s transformation larger/);
  assert.ok(html.indexOf("Jesse") < html.indexOf("Andrew"));
  assert.match(html, /jesse-before-after\.jpg/);
});

test("server-renders the current-client booking flow", async () => {
  const response = await render("/clients");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Current Client Booking/);
  assert.match(html, /Choose your stylist/);
  assert.match(html, /Stylist A/);
  assert.match(html, /No appointment data is saved or sent/);
});
