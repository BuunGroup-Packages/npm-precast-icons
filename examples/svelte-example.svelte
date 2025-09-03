<script>
  import { 
    HomeIcon,
    SearchIcon,
    UserIcon,
    HeartIcon,
    StarIcon,
    MenuIcon,
    CheckIcon,
    DownloadIcon,
    UploadIcon
  } from '@precast/icons/svelte'
  
  let selectedIcon = 'home'
  let dynamicColor = '#3b82f6'
  let strokeWidth = 2
  
  const iconMap = {
    home: HomeIcon,
    search: SearchIcon,
    user: UserIcon,
    heart: HeartIcon,
    star: StarIcon
  }
  
  $: DynamicIcon = iconMap[selectedIcon]
</script>

<div class="icon-showcase">
  <h1>Precast Icons - Svelte Examples</h1>
  <p class="subtitle">Comprehensive showcase of icon usage patterns in Svelte applications</p>
  
  <section>
    <h2>Basic Icons</h2>
    <div class="icon-row">
      <HomeIcon />
      <SearchIcon />
      <UserIcon />
      <HeartIcon />
      <StarIcon />
      <MenuIcon />
      <CheckIcon />
    </div>
  </section>

  <section>
    <h2>Size Variations</h2>
    <div class="icon-row size-demo">
      <div class="icon-wrapper">
        <HomeIcon size={16} />
        <span>16px</span>
      </div>
      <div class="icon-wrapper">
        <HomeIcon size={24} />
        <span>24px (default)</span>
      </div>
      <div class="icon-wrapper">
        <HomeIcon size={32} />
        <span>32px</span>
      </div>
      <div class="icon-wrapper">
        <HomeIcon size={48} />
        <span>48px</span>
      </div>
      <div class="icon-wrapper">
        <HomeIcon size={64} />
        <span>64px</span>
      </div>
      <div class="icon-wrapper">
        <HomeIcon size="5rem" />
        <span>5rem</span>
      </div>
    </div>
  </section>

  <section>
    <h2>Color Customization</h2>
    <div class="icon-row">
      <HeartIcon size={32} color="red" />
      <StarIcon size={32} color="gold" />
      <CheckIcon size={32} color="green" />
      <SearchIcon size={32} color="#3b82f6" />
      <UserIcon size={32} color="#8b5cf6" />
      <MenuIcon size={32} color="#10b981" />
    </div>
  </section>

  <section>
    <h2>Stroke Width</h2>
    <div class="icon-row size-demo">
      <div class="icon-wrapper">
        <SearchIcon size={32} strokeWidth={0.5} />
        <span>0.5</span>
      </div>
      <div class="icon-wrapper">
        <SearchIcon size={32} strokeWidth={1} />
        <span>1</span>
      </div>
      <div class="icon-wrapper">
        <SearchIcon size={32} strokeWidth={2} />
        <span>2 (default)</span>
      </div>
      <div class="icon-wrapper">
        <SearchIcon size={32} strokeWidth={3} />
        <span>3</span>
      </div>
      <div class="icon-wrapper">
        <SearchIcon size={32} strokeWidth={4} />
        <span>4</span>
      </div>
    </div>
  </section>

  <section>
    <h2>Fill and Stroke Combinations</h2>
    <div class="icon-row">
      <HeartIcon size={32} fill="pink" stroke="red" strokeWidth={2} />
      <StarIcon size={32} fill="yellow" stroke="orange" strokeWidth={2} />
      <UserIcon size={32} fill="lightblue" stroke="navy" strokeWidth={2} />
      <HeartIcon size={32} fill="red" stroke="none" />
      <StarIcon size={32} fill="gold" stroke="none" />
    </div>
  </section>

  <section>
    <h2>Interactive Examples</h2>
    <div class="button-row">
      <button class="btn btn-primary">
        <DownloadIcon size={20} />
        Download
      </button>
      
      <button class="btn btn-success">
        <CheckIcon size={20} />
        Success
      </button>
      
      <button class="btn btn-danger">
        Cancel
      </button>
      
      <button class="btn btn-warning">
        <UploadIcon size={20} />
        Upload
      </button>
    </div>
  </section>

  <section>
    <h2>Dynamic Icon Loading</h2>
    <div class="dynamic-section">
      <select bind:value={selectedIcon} class="icon-select">
        <option value="home">Home</option>
        <option value="search">Search</option>
        <option value="user">User</option>
        <option value="heart">Heart</option>
        <option value="star">Star</option>
      </select>
      
      <div class="dynamic-icon-display">
        <svelte:component 
          this={DynamicIcon} 
          size={48} 
          color={dynamicColor}
          strokeWidth={strokeWidth}
        />
      </div>
      
      <div class="controls">
        <label>
          Color: 
          <input type="color" bind:value={dynamicColor} />
        </label>
        <label>
          Stroke Width: 
          <input 
            type="range" 
            bind:value={strokeWidth} 
            min="0.5" 
            max="4" 
            step="0.5"
          />
          {strokeWidth}
        </label>
      </div>
    </div>
  </section>

  <section>
    <h2>List with Icons</h2>
    <ul class="icon-list">
      <li>
        <CheckIcon size={20} color="green" />
        <span>Task completed successfully</span>
      </li>
      <li>
        <StarIcon size={20} color="orange" />
        <span>Important: Review required</span>
      </li>
      <li>
        <HeartIcon size={20} color="red" />
        <span>Favorite item</span>
      </li>
    </ul>
  </section>

  <section>
    <h2>Navigation Menu</h2>
    <nav class="nav-menu">
      <a href="/" class="nav-item">
        <HomeIcon size={20} />
        <span>Home</span>
      </a>
      <a href="/profile" class="nav-item">
        <UserIcon size={20} />
        <span>Profile</span>
      </a>
      <a href="/menu" class="nav-item">
        <MenuIcon size={20} />
        <span>Menu</span>
      </a>
    </nav>
  </section>

  <section>
    <h2>Animated Icons</h2>
    <div class="icon-row">
      <div class="spin-animation">
        <StarIcon size={32} />
      </div>
      <div class="pulse-animation">
        <HeartIcon size={32} color="red" />
      </div>
      <div class="bounce-animation">
        <DownloadIcon size={32} color="#3b82f6" />
      </div>
    </div>
  </section>

  <section>
    <h2>Form Input with Icons</h2>
    <div class="form-group">
      <div class="input-with-icon">
        <SearchIcon size={20} class="input-icon" />
        <input type="text" placeholder="Search..." />
      </div>
      
      <div class="input-with-icon">
        <UserIcon size={20} class="input-icon" />
        <input type="text" placeholder="Username" />
      </div>
      
      <div class="input-with-icon">
        <HeartIcon size={20} class="input-icon" />
        <input type="text" placeholder="Favorites" />
      </div>
    </div>
  </section>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  .icon-showcase {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    font-family: system-ui, -apple-system, sans-serif;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #1a202c;
  }

  .subtitle {
    color: #718096;
    margin-bottom: 2rem;
  }

  section {
    margin-bottom: 3rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
  }

  .icon-row {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .size-demo {
    gap: 2rem;
  }

  .icon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  .icon-wrapper span {
    font-size: 0.75rem;
    color: #718096;
  }

  .button-row {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }

  .btn-primary {
    background: white;
    color: #3b82f6;
    border: 2px solid #3b82f6;
  }

  .btn-primary:hover {
    background: #3b82f6;
    color: white;
  }

  .btn-success {
    background: #10b981;
    color: white;
  }

  .btn-success:hover {
    background: #059669;
  }

  .btn-danger {
    background: #ef4444;
    color: white;
  }

  .btn-danger:hover {
    background: #dc2626;
  }

  .btn-warning {
    background: #f59e0b;
    color: white;
  }

  .btn-warning:hover {
    background: #d97706;
  }

  .dynamic-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .icon-select {
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    font-size: 1rem;
    max-width: 200px;
  }

  .dynamic-icon-display {
    padding: 2rem;
    background: #f7fafc;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
  }

  .controls {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .controls label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #4a5568;
  }

  .controls input[type="color"] {
    width: 50px;
    height: 30px;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
  }

  .controls input[type="range"] {
    width: 150px;
  }

  .icon-list {
    list-style: none;
    padding: 0;
  }

  .icon-list li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
  }

  .nav-menu {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #4a5568;
    text-decoration: none;
    transition: color 0.2s;
  }

  .nav-item:hover {
    color: #3b82f6;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
  }

  .input-with-icon {
    position: relative;
  }

  :global(.input-icon) {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #718096;
  }

  .input-with-icon input {
    width: 100%;
    padding: 0.75rem 0.75rem 0.75rem 3rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 1rem;
  }

  .input-with-icon input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  /* Animations */
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.8; }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .spin-animation {
    animation: spin 2s linear infinite;
  }

  .pulse-animation {
    animation: pulse 2s ease-in-out infinite;
  }

  .bounce-animation {
    animation: bounce 1s ease-in-out infinite;
  }
</style>