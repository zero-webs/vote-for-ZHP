async function loadVotes() {
  const res = await fetch("/api/count");
  const data = await res.json();
  document.getElementById("votes").innerText = data.count;
}

document.getElementById("voteBtn").onclick = async () => {
  const res = await fetch("/api/vote", { method: "POST" });
  const data = await res.json();

  if (data.error) {
    alert(data.error);
  }

  loadVotes();
};

setInterval(loadVotes, 5000);
loadVotes();
