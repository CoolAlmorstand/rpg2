<script lang="ts">
  // ── Props ──
  let roomId = $state("XKCD42");
  let ping = $state(20);

  // ── Tab system ──
  type Tab = { id: string; label: string };
  const tabs: Tab[] = [
    { id: "players", label: "PLAYERS" },
    { id: "status",  label: "STATUS"  },
    { id: "chat",    label: "CHAT"    },
    { id: "map",     label: "MAP"     },
    { id: "items",   label: "ITEMS"   },
    { id: "quests",  label: "QUESTS"  },
  ];
  let activeTab = $state("players");

  // ── Players ──
  let activePlayers = $state([
    { name: "Aldric", ready: true  },
    { name: "Mira",   ready: false },
    { name: "Thorn",  ready: true  },
  ]);

  // ── Chat ──
  let chatMessages = $state([
    { author: "Mira",   text: "ready soon!" },
    { author: "Aldric", text: "no rush"     },
  ]);
  let chatInput = $state("");

  // ── Status ──
  let playerStatus = $state({ health: 80, hunger: 55, mana: 40 });

  // ── Derived ──
  let pingColor = $derived(ping < 60 ? "#4ade80" : ping < 120 ? "#facc15" : "#f87171");

  // ── Handlers ──
  function onBack() {
    // TODO: navigate back
    console.log("back");
  }

  function onEnterGame() {
    // TODO: enter game
    console.log("enter game");
  }

  function sendChat() {
    const trimmed = chatInput.trim();
    if (!trimmed) return;
    chatMessages = [...chatMessages, { author: "You", text: trimmed }];
    chatInput = "";
  }

  function handleChatKey(e: KeyboardEvent) {
    if (e.key === "Enter") sendChat();
  }
</script>

<div class="room-root">

  <!-- TOP BAR -->
  <div class="top-bar">
    <button class="back-btn" onclick={onBack} aria-label="Back">&#8249;</button>

    <div class="room-id-badge">
      <span class="room-id-label">ROOM</span>
      <span class="room-id-value">{roomId}</span>
    </div>

    <div class="ping-indicator" title="Ping: {ping}ms">
      <div class="ping-dot" style="background:{pingColor}; box-shadow:0 0 8px {pingColor}"></div>
      <span class="ping-ms" style="color:{pingColor}">{ping}ms</span>
    </div>
  </div>

  <!-- TAB BAR -->
  <div class="tab-bar" role="tablist">
    {#each tabs as tab}
      <button
        role="tab"
        aria-selected={activeTab === tab.id}
        class="tab-btn"
        class:active={activeTab === tab.id}
        onclick={() => activeTab = tab.id}
      >
        {tab.label}
      </button>
    {/each}
  </div>

  <!-- TAB CONTENT -->
  <div class="tab-content">

    {#if activeTab === "players"}
      <div class="panel">
        <p class="panel-label">ACTIVE PLAYERS</p>
        <ul class="player-list">
          {#each activePlayers as p}
            <li class="player-row">
              <span class="ready-dot" style="background:{p.ready ? '#4ade80' : '#6b7280'}"></span>
              <span class="player-name">{p.name}</span>
              <span class="player-status-text">{p.ready ? "ready" : "waiting"}</span>
            </li>
          {/each}
        </ul>
      </div>

    {:else if activeTab === "status"}
      <div class="panel">
        <p class="panel-label">PLAYER STATUS</p>
        <div class="stat-list">
          <div class="stat-row">
            <span class="stat-name">HP</span>
            <div class="stat-bar-track">
              <div class="stat-bar hp" style="width:{playerStatus.health}%"></div>
            </div>
            <span class="stat-val">{playerStatus.health}</span>
          </div>
          <div class="stat-row">
            <span class="stat-name">HUNGER</span>
            <div class="stat-bar-track">
              <div class="stat-bar hunger" style="width:{playerStatus.hunger}%"></div>
            </div>
            <span class="stat-val">{playerStatus.hunger}</span>
          </div>
          <div class="stat-row">
            <span class="stat-name">MANA</span>
            <div class="stat-bar-track">
              <div class="stat-bar mana" style="width:{playerStatus.mana}%"></div>
            </div>
            <span class="stat-val">{playerStatus.mana}</span>
          </div>
        </div>
      </div>

    {:else if activeTab === "chat"}
      <div class="panel chat-panel">
        <p class="panel-label">CHAT</p>
        <div class="chat-messages">
          {#each chatMessages as msg}
            <div class="chat-msg">
              <span class="chat-author">{msg.author}:</span>
              <span class="chat-text">{msg.text}</span>
            </div>
          {/each}
        </div>
        <div class="chat-input-row">
          <input
            class="chat-input"
            bind:value={chatInput}
            onkeydown={handleChatKey}
            placeholder="say something..."
            maxlength="120"
          />
          <button class="chat-send-btn" onclick={sendChat}>›</button>
        </div>
      </div>

    {:else if activeTab === "map"}
      <div class="panel placeholder-panel">
        <p class="panel-label">MAP</p>
        <p class="placeholder-text">— coming soon —</p>
      </div>

    {:else if activeTab === "items"}
      <div class="panel placeholder-panel">
        <p class="panel-label">ITEMS</p>
        <p class="placeholder-text">— coming soon —</p>
      </div>

    {:else if activeTab === "quests"}
      <div class="panel placeholder-panel">
        <p class="panel-label">QUESTS</p>
        <p class="placeholder-text">— coming soon —</p>
      </div>
    {/if}

  </div>

  <!-- BOTTOM BAR -->
  <div class="bottom-bar">
    <button class="enter-btn" onclick={onEnterGame}>ENTER GAME</button>
  </div>

</div>

<style>
  :root {
    --parchment:      #fdf8d4;
    --parchment-dark: #ede8b8;
    --brown:          #9B7653;
    --brown-dark:     #7a5c3e;
    --brown-light:    #c4a97a;
    --ink:            #2a1f0e;
    --ink-faint:      #6b5840;
    --radius:         6px;
    --font-title:     'Micro 5', monospace;
    --font-body:      'Pixelify Sans', sans-serif;
  }

  .room-root {
    font-family: var(--font-body);
    background-color: var(--parchment);
    background-image: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 28px,
      rgba(155,118,83,0.06) 28px,
      rgba(155,118,83,0.06) 29px
    );
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    color: var(--ink);
    overflow: hidden;
  }

  /* ── Top bar ── */
  .top-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px 8px;
    border-bottom: 2px solid var(--brown);
    background: var(--parchment);
    flex-shrink: 0;
  }

  .back-btn {
    background: none;
    border: 2px solid var(--brown);
    border-radius: var(--radius);
    color: var(--brown-dark);
    font-size: 26px;
    line-height: 1;
    padding: 1px 8px 4px;
    cursor: pointer;
    transition: background 0.15s;
    font-family: var(--font-body);
  }
  .back-btn:hover { background: var(--parchment-dark); }

  .room-id-badge {
    flex: 1;
    border: 2px solid var(--brown);
    border-radius: var(--radius);
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 12px;
    background: var(--parchment-dark);
  }
  .room-id-label {
    font-family: var(--font-title);
    font-size: 11px;
    color: var(--ink-faint);
    letter-spacing: 2px;
  }
  .room-id-value {
    font-family: var(--font-title);
    font-size: 22px;
    color: var(--ink);
    letter-spacing: 3px;
  }

  .ping-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    min-width: 40px;
  }
  .ping-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transition: background 0.4s, box-shadow 0.4s;
  }
  .ping-ms {
    font-size: 10px;
    transition: color 0.4s;
  }

  /* ── Tab bar ── */
  .tab-bar {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    border-bottom: 2px solid var(--brown);
    background: var(--parchment-dark);
    flex-shrink: 0;
    scrollbar-width: none;
  }
  .tab-bar::-webkit-scrollbar { display: none; }

  .tab-btn {
    scroll-snap-align: start;
    flex-shrink: 0;
    background: none;
    border: none;
    border-right: 1px solid var(--brown-light);
    border-bottom: 3px solid transparent;
    padding: 10px 18px;
    font-family: var(--font-title);
    font-size: 13px;
    letter-spacing: 2px;
    color: var(--ink-faint);
    cursor: pointer;
    transition: color 0.15s, background 0.15s, border-bottom-color 0.15s;
    white-space: nowrap;
    /* offset the 2px bottom border on .tab-bar so active indicator sits flush */
    margin-bottom: -2px;
  }
  .tab-btn:hover {
    background: rgba(155,118,83,0.08);
    color: var(--ink);
  }
  .tab-btn.active {
    color: var(--ink);
    background: var(--parchment);
    border-bottom-color: var(--brown-dark);
  }

  /* ── Tab content ── */
  .tab-content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* ── Generic panel ── */
  .panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 14px 12px;
    overflow-y: auto;
    gap: 10px;
  }

  .panel-label {
    font-family: var(--font-title);
    font-size: 11px;
    letter-spacing: 3px;
    color: var(--ink-faint);
    margin: 0 0 4px;
    flex-shrink: 0;
  }

  /* ── Players ── */
  .player-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .player-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border: 1px solid var(--brown);
    border-radius: var(--radius);
    background: var(--parchment-dark);
  }
  .ready-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .player-name { flex: 1; font-size: 15px; }
  .player-status-text {
    font-family: var(--font-title);
    font-size: 10px;
    letter-spacing: 1px;
    color: var(--ink-faint);
  }

  /* ── Status ── */
  .stat-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .stat-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .stat-name {
    font-family: var(--font-title);
    font-size: 11px;
    letter-spacing: 1px;
    color: var(--ink-faint);
    width: 50px;
    flex-shrink: 0;
  }
  .stat-bar-track {
    flex: 1;
    height: 10px;
    background: var(--parchment-dark);
    border: 1px solid var(--brown);
    border-radius: 5px;
    overflow: hidden;
  }
  .stat-bar {
    height: 100%;
    border-radius: 5px;
    transition: width 0.4s ease;
  }
  .stat-bar.hp     { background: #f87171; }
  .stat-bar.hunger { background: #fb923c; }
  .stat-bar.mana   { background: #60a5fa; }
  .stat-val {
    font-family: var(--font-title);
    font-size: 11px;
    color: var(--ink-faint);
    width: 24px;
    text-align: right;
  }

  /* ── Chat ── */
  .chat-panel { justify-content: space-between; }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-bottom: 8px;
  }
  .chat-msg { font-size: 14px; line-height: 1.5; }
  .chat-author {
    font-family: var(--font-title);
    font-size: 12px;
    color: var(--brown-dark);
    margin-right: 5px;
  }
  .chat-text { color: var(--ink); }

  .chat-input-row {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
  }
  .chat-input {
    flex: 1;
    background: var(--parchment-dark);
    border: 1px solid var(--brown);
    border-radius: var(--radius);
    padding: 6px 10px;
    font-family: var(--font-body);
    font-size: 13px;
    color: var(--ink);
    outline: none;
  }
  .chat-input:focus { border-color: var(--brown-dark); }

  .chat-send-btn {
    background: var(--brown);
    border: none;
    border-radius: var(--radius);
    color: var(--parchment);
    font-size: 20px;
    padding: 2px 12px;
    cursor: pointer;
    line-height: 1;
    transition: background 0.15s;
  }
  .chat-send-btn:hover { background: var(--brown-dark); }

  /* ── Placeholder ── */
  .placeholder-panel {
    justify-content: center;
    align-items: center;
  }
  .placeholder-text {
    font-family: var(--font-title);
    font-size: 13px;
    letter-spacing: 2px;
    color: var(--brown-light);
  }

  /* ── Bottom bar ── */
  .bottom-bar {
    padding: 10px 12px 12px;
    border-top: 2px solid var(--brown);
    background: var(--parchment);
    flex-shrink: 0;
  }
  .enter-btn {
    width: 100%;
    padding: 12px;
    background: var(--ink);
    color: var(--parchment);
    font-family: var(--font-title);
    font-size: 24px;
    letter-spacing: 4px;
    border: 2px solid var(--ink);
    border-radius: var(--radius);
    cursor: pointer;
    transition: background 0.15s;
  }
  .enter-btn:hover  { background: var(--brown-dark); border-color: var(--brown-dark); }
  .enter-btn:active { transform: translateY(1px); }

  /* ── Scrollbars ── */
  .panel::-webkit-scrollbar,
  .chat-messages::-webkit-scrollbar { width: 4px; }
  .panel::-webkit-scrollbar-thumb,
  .chat-messages::-webkit-scrollbar-thumb {
    background: var(--brown-light);
    border-radius: 4px;
  }
</style>
