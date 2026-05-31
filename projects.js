/* =====================================================================
   PROJECTS DATA — edit this file to update everything about a project.
   No build step needed: just save and refresh the browser.

   Adding a project: copy one entry block, give it a new unique key,
   and add a thumbnail at assets/images/projects/<key>/screenshot.jpg.

   mediaType (project page media):
     'youtube' — mediaSrc is the YouTube video ID (part after ?v=)
     'video'   — mediaSrc is a path to a local .mp4 / .webm file
     'image'   — mediaSrc is a path to a screenshot

   featuresIntro: optional line of text shown between the links and the
     features accordion. Omit or leave empty to hide.

   features: one entry per major contribution. Each becomes an
   expandable accordion panel on the project page with a description
   and an optional code snippet.
     snippet.lang: 'csharp' | 'gdscript' | 'javascript' | 'glsl'
   ===================================================================== */

const projectData = {

  /* ─── PROJECT 1 ─────────────────────────────────────────────────── */
  'masterpiece-of-sin': {

    // ── Card ──────────────────────────────────────────────────────────
    title:    'Masterpiece of Sin',          // game name (also used in the modal header)
    tags:     ['unity'],          // filter values: 'unity' | 'godot' | 'unreal' | 'jam'
    engine:   'Unity',          // orange tag, e.g. 'Unity'
    lang:     'C#',              // blue tag — programming language
    jam:      '',          // yellow tag, e.g. 'Global Game Jam 2025' — leave empty if not a jam
    thumb:    'assets/images/projects/game-one/screenshot.png',
    cardDesc: 'An adventure game developed over the course of three months. I was one of two programmers on the team.',          // one sentence — lead with the mechanic, not the genre
    contributionsTitle: 'My contributions', // omit or set '' to hide the title
    contributions: ['Character controller', 'Audio system using FMOD', 'Inventory system', , 'Interaction system'],
    links: [
      { label: 'View on itch.io',         url: 'https://rognin.itch.io/masterpiece-of-sin' },
    ],

    // ── Project page ──────────────────────────────────────────────────
    duration:    '3 months',
    teamSize:    '6 people',
    role:        'Programmer',
    description: 'Masterpiece of Sin is a third-person adventure game developed over the course of three months. I was one of two programmers on the team.',       // 2–3 sentences shown at the top of the project page
    mediaType:   'image',  // 'youtube' | 'video' | 'image'
    mediaSrc:    'assets/images/projects/game-one/screenshot.png',
    techStack:     ['FMOD', 'Git'],
    featuresIntro: 'Here you can see my main contributions to the project. Click on a section to expand it.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gamepad2-icon lucide-gamepad-2"><line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>`,
        title: 'Third-Person Controller',
        description: 'The movement in the game is simple, you just walk or run around in third person. I used Unity\'s CharacterController component and the (relatively) new input system with some custom code for the camera.',
        subfeatures: [
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Camera Collision Recovery',
            description: 'To avoid the camera clipping through walls, I used a SphereCast to detect objects and put the camera in front of them.',
            snippet: {
              label: 'ThirdPersonController.cs — UpdateCameraPosition()',
              lang: 'csharp',
              code: `private void UpdateCameraPosition()
    {
        if (!canLook) return;
        
        if (!cameraTransform) return;
        
        // Get camera pivot point
        Vector3 pivot = transform.position + Vector3.up * cameraPivotHeight;

        // Desired camera rotation
        Quaternion camRot = Quaternion.Euler(pitch, yaw, 0);

        // Desired camera position
        Vector3 desiredPos = pivot + camRot * cameraOffset;
        
        // Check for obstacles
        Vector3 direction = desiredPos - pivot;
        float distance = direction.magnitude;
        
        // Put camera closer if it's inside an obstacle
        if (Physics.SphereCast(pivot, cameraRadius, direction.normalized, out RaycastHit hit, distance, collisionMask))
        {
            desiredPos = pivot + direction.normalized * (hit.distance - cameraRadius);
        }

        // Smooth follow
        cameraTransform.position = Vector3.Lerp(cameraTransform.position, desiredPos, cameraSmoothSpeed * Time.deltaTime);
        cameraTransform.rotation = Quaternion.Lerp(cameraTransform.rotation, camRot, cameraSmoothSpeed * Time.deltaTime);
    }`,
            },
          },
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Camera-Relative Movement',
            description: 'I wanted the player to always move in the direction the camera is facing, so I derived the movement direction from the camera\'s yaw.',
            snippet: {
              label: 'ThirdPersonController.cs — HandleMovement()',
              lang: 'csharp',
              code: `Quaternion yawRotation = Quaternion.Euler(0f, yaw, 0f);

Vector3 camForward = yawRotation * Vector3.forward;
Vector3 camRight   = yawRotation * Vector3.right;

Vector3 moveDir = camForward * moveInput.y + camRight * moveInput.x;

if (moveDir.magnitude > 0.1f)
{
    Quaternion targetRot = Quaternion.LookRotation(moveDir);
    transform.rotation = Quaternion.Lerp(transform.rotation, targetRot,
                                          rotationSpeed * Time.deltaTime);
}`,
            },
          },
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Input Lock on Inventory Open',
            description: 'While the inventory is opened, the input is locked.',
            snippet: {
              label: 'ThirdPersonController.cs — HandleInventoryToggle()',
              lang: 'csharp',
              code: `private void HandleInventoryToggle(bool isOpen)
    {
        canMove = !isOpen;
        canLook = !isOpen;
        
        // Disable look action to prevent delta accumulation
        var lookAction = playerInput.actions["Look"];

        if (isOpen)
        {
            lookAction.Disable();
        }
        else
        {
            lookAction.Enable();
            lookInput = Vector2.zero;
        }
        
        Cursor.visible = isOpen;
        Cursor.lockState = isOpen
            ? CursorLockMode.None
            : CursorLockMode.Locked;
    }`,
            },
          },
        ],
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
        title: 'FMOD Audio System',
        description: 'Our composer and I wanted to use FMOD for audio management. I implemented an AudioManager class that handles different kinds of sounds (one-shots, ambience loops, music tracks) and provides methods to control them.',
        subfeatures: [
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Playing sounds',
            description: 'Sounds are stored in Dictionaries, keyed by name. Here\'s a method that plays a one-shot sound.',
            snippet: {
              label: 'AudioManager.cs — PlayOneShot()',
              lang: 'csharp',
              code: `public void PlayOneShot(string soundName, Vector3 position, float volume = 1f)
        {
            
            if (!soundEffects.TryGetValue(soundName, out OneShotData data))
            {
                Debug.LogError($"Sound not found. Name: {soundName}");
                return;
            }
            
            EventInstance oneShotInstance = RuntimeManager.CreateInstance(data.eventRef);

            oneShotInstance.set3DAttributes(position.To3DAttributes());
            oneShotInstance.setVolume(volume * data.defaultVolume);

            oneShotInstance.start();
            oneShotInstance.release();
        }`,
            },
          },
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Parameterized Ambience Variants',
            description: 'Ambience loop instances are tracked to allow control of audio parameters at runtime.',
            snippet: {
              label: 'AudioManager.cs — PlayAmbience()',
              lang: 'csharp',
              code: `public void PlayAmbience(string ambienceName, GameObject ambienceSource, float volume  = 1f)
        {

            if (!ambienceSounds.TryGetValue(ambienceName, out AmbienceData data))
            {
                Debug.LogError($"Ambience track not found: {ambienceName}");
                return;
            }

            if (activeAmbienceInstances.ContainsKey(ambienceName))
            {
                Debug.Log("Ambience already playing: " + ambienceName);
                return; // Ambience track already playing -> return
            }

            EventInstance ambienceEventInstance = RuntimeManager.CreateInstance(data.eventRef);
            ambienceEventInstance.setVolume(volume * data.defaultVolume);

            if (ambienceSource != null)
            {
                RuntimeManager.AttachInstanceToGameObject(
                    ambienceEventInstance,
                    ambienceSource
                );
            }
            else
            {
                Debug.LogWarning("Ambiance source is null, playing " + ambienceName +" as 2D");
            }

            ambienceEventInstance.start();
            activeAmbienceInstances.Add(ambienceName, ambienceEventInstance);
        }`,
            },
          },
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'FMOD Bus Volume Control',
            description: 'Buses are used to control volume for groups of sounds.',
            snippet: {
              label: 'AudioManager.cs — InitializeBuses() + SetBusVolume()',
              lang: 'csharp',
              code: `private void InitializeBuses()
{
    AddBusToDict("Master", "bus:/");
    AddBusToDict("Music",  "bus:/Music Bus");
}

public void SetBusVolume(string busKey, float volume)
{
    if (!buses.TryGetValue(busKey, out Bus bus))
    {
        Debug.LogError($"Bus not registered: {busKey}");
        return;
    }
    bus.setVolume(volume);
}`,
            },
          },
        ],
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
        title: 'Inventory System',
        description: 'The inventory system consists of three parts: InventoryData holds the information about the inventory, InventoryUI displays it to the player and InventoryManager connects them and handles the logic. Inventory items are represented by ScriptableObjects.',
        subfeatures: [
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Event-Driven UI Sync',
            description: 'One of three events (OnSlotAdded, OnSlotChanged, OnSlotRemoved) is fired whenever there\'s a change to the inventory slots. AddItem checks for an existing slot to stack into before creating a new one, then fires the appropriate event.',
            snippet: {
              label: 'InventoryManager.cs — events + AddItem()',
              lang: 'csharp',
              code: `public event Action<Inventory.Slot, int> OnSlotAdded;
public event Action<Inventory.Slot, int> OnSlotChanged;
public event Action<int> OnSlotRemoved;

public void AddItem(InventoryItem item, int amount = 1)
        {
        
            // If there is already a slot with this item, add to the quantity
            for (int i = 0; i < inventory.slots.Count; i++)
            {
                var slot = inventory.slots[i];
                if (slot.item == item)
                {
                    slot.quantity += amount;
                    OnSlotChanged?.Invoke(slot, i);
                    return;
                }
            }
        
            // If there is no slot with this item, create one
            var newSlot = new Inventory.Slot { item = item, quantity = amount };
            inventory.slots.Add(newSlot);
            OnSlotAdded?.Invoke(newSlot, inventory.slots.Count - 1);
        }`,
            },
          },
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'UI integration',
            description: 'InventoryUI handles the visual representation of the inventory slots and subscribes to the InventoryManager events to update the display whenever there\'s a change.',
            snippet: {
              label: 'InventoryUI.cs — RegisterInventoryManager() + HandleSlotAdded()',
              lang: 'csharp',
              code: `public void RegisterInventoryManager(InventoryManager newManager)
        {
            
            if (newManager == manager)
                return;
            
            // Deregister the old inventory manager if there's already one
            if (manager != null)
            {
                DeregisterInventoryManager(manager);
            }

            manager = newManager;

            // Register the new inventory manager
            manager.OnSlotAdded += HandleSlotAdded;
            manager.OnSlotChanged += HandleSlotChanged;
            manager.OnSlotRemoved += HandleSlotRemoved;
            
            InitializeSlots();
        }
              
private void HandleSlotAdded(Inventory.Slot slot, int index)
        {
            // Check if the slotContainer has a VLayout group
            var newSlot = Instantiate(slotPrefab, slotContainer);
            var newSlotUI = newSlot.GetComponent<InventorySlotUI>();
            newSlotUI.Set(slot.item, slot.quantity);
            newSlotUI.Initialize(this);

            uiSlots.Insert(index, newSlotUI);
            ReorderUI();
        }`,
            },
          },
        ],
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pointer-icon lucide-pointer"><path d="M22 14a8 8 0 0 1-8 8"/><path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1"/><path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>`,
        title: 'Interaction & Pickup System',
        description: 'The interaction system is meant to be expandable to allow for different types of interaction. In this game we only ended up using it for pickups, which can be added to the inventory when interacted with.',
        subfeatures: [
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Pickups as interactable objects',
            description: 'Pickups override the OnInteract method to be picked up on interaction.',
            snippet: {
              label: 'IInteractable.cs + PickupBase.cs — OnInteract()',
              lang: 'csharp',
              code: `public interface IInteractable
    {
        public void OnInteract(GameObject player);
        public bool IsInRange(Transform player);
    }
        
public virtual void OnInteract(GameObject player)
        {
            // Try to get the reference to the InventoryManager on the player object
            InventoryManager manager = player.GetComponent<InventoryManager>();

            if (manager == null)
            {
                Debug.LogWarning("PickupTestBox OnInteract called without InventoryManager");
            }
            else
            {
                manager.AddItem(this.pickupPrefab);
            }
            
            Debug.Log("Pickup Test Box has been interacted with");
        }`,
            },
          },
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Picking up collectables',
            description: 'Here the player interacts with the closest pickup within range.',
            snippet: {
              label: 'PlayerInteraction.cs — OnInteractPerformed() + FindNearestPickup()',
              lang: 'csharp',
              code: `private void OnInteractPerformed(InputAction.CallbackContext ctx)
        {
            PickupBase pickup = FindNearestPickup();
            if (pickup != null && pickup.IsInRange(transform))
            {
                pickup.OnInteract(gameObject);
            }
        }
              
  private PickupBase FindNearestPickup()
        {
            Collider[] hits = Physics.OverlapSphere(transform.position, checkRange, interactableMask);

            float closest = Mathf.Infinity;
            PickupBase nearest = null;

            foreach (var h in hits)
            {
                if (h.TryGetComponent<PickupBase>(out var pickup))
                {
                    float dist = Vector3.Distance(transform.position, pickup.transform.position);
                    if (dist < closest)
                    {
                        closest = dist;
                        nearest = pickup;
                    }
                }
            }

            return nearest;
        }`,
            },
          },
        ],
      },
    ],

    // features example:
    // [
    //   {
    //     title:       'Combat System',
    //     description: 'Optional overview shown at the top of this panel.',
    //     // subfeatures — nested accordions inside this panel (optional)
    //     subfeatures: [
    //       {
    //         title:       'Attack State Machine',
    //         description: 'Implemented a state-machine-driven combat loop with ' +
    //                      '4 attack states, hit-stop, and hitstun frames.',
    //         snippet: {   // optional — omit entirely if no code to show
    //           label: 'CombatController.cs — Attack State',
    //           lang:  'csharp',
    //           code:  `IEnumerator AttackState() {
    //   yield return new WaitForSeconds(hitStopDuration);
    //   animator.SetTrigger("Attack");
    // }`,
    //         },
    //       },
    //       {
    //         title:       'Hit Detection',
    //         description: 'Used overlap spheres on attack frames rather than continuous colliders.',
    //         // no snippet = no code block
    //       },
    //     ],
    //   },
    //   {
    //     title:       'Procedural Level Assembly',
    //     description: 'Built a chunking system that assembles prefabs at runtime.',
    //     // flat panel — no subfeatures, no snippet
    //   },
    // ],
  },

  /* ─── PROJECT 2 ─────────────────────────────────────────────────── */
  'treasure-together': {
    title:    'Treasure Together',
    tags:     ['unity'],
    engine:   'Unity',
    lang:     'C#',
    jam:      '',
    thumb:    'assets/images/projects/game-two/screenshot.png',
    cardDesc: 'A co-op action game built with Netcode for GameObjects.',
    contributionsTitle: 'Features',
    contributions: ['Local multiplayer', 'Network-synced shooting', 'Treasure tracking system', 'Feedbacks with FEEL asset', 'Powerups'],
    links: [
      { label: 'View Source on GitHub ↗', url: 'https://github.com/Rognin/netcode-unity-game' },
    ],
    duration:      '1 month',
    teamSize:      'Solo project',
    role:          '',
    description:   'Treasure Together is a small co-op game built with Unity\'s Netcode for GameObjects. The goal of the game is to work together to find chests hidden all around the island and open them.',
    mediaType:     'image',
    mediaSrc:      'assets/images/projects/game-two/screenshot.png',
    techStack:     ['Netcode for GameObjects', 'FEEL'],
    featuresIntro: 'Here you can read about some of the features I implemented. Click on a section to expand it.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>`,
        title: 'Network-Synced Shooting',
        description: 'The game allows players to open chests by shooting projectiles at them. To synchronize the shooting across the network, a local bullet is spawned immediately on the shooting client, while an authoritative bullet is spawned on the server for actual hit detection.',
        subfeatures: [
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Local Bullets',
            description: 'When the player fires, a local ClientBullet is spawned immediately for instant visual feedback. A ServerRpc sends the shot to the server, which spawns the authoritative NetworkBullet for hit detection.',
            snippet: {
              label: 'PlayerShoot.cs — Fire() + SpawnClientBullet() + RequestShootServerRpc()',
              lang: 'csharp',
              code: `private void Fire()
{
    if (Time.time - lastFireTime < fireCooldown)
        return;

    lastFireTime = Time.time;

    Vector3 origin = shotOrigin.position;
    Vector3 direction = playerCamera.transform.forward;

    SpawnClientBullet(origin, direction);
    RequestShootServerRpc(origin, direction);
}

private void SpawnClientBullet(Vector3 origin, Vector3 direction)
{
    GameObject bullet = Instantiate(clientBulletPrefab, origin, Quaternion.identity);
    Rigidbody rb = bullet.GetComponent<Rigidbody>();
    rb.linearVelocity = direction * bulletSpeed;
}
    
[ServerRpc]
private void RequestShootServerRpc(Vector3 origin, Vector3 direction, ServerRpcParams rpcParams = default)
{
    ulong clientId = rpcParams.Receive.SenderClientId;

    if (!ValidateShot(clientId, origin, direction))
    {
        return;
    }

    // Spawn network bullet
    GameObject bullet = Instantiate(networkBulletPrefab, origin, Quaternion.identity);
    NetworkObject networkObject = bullet.GetComponent<NetworkObject>();
    networkObject.Spawn();

    // Initialize bullet
    bullet.GetComponent<NetworkBullet>()
        .InitializeOnServer(direction, bulletSpeed, clientId);
}`,
            },
          },
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Server-Side Shot Validation',
            description: 'The game is co-op, so there\'s little cheating prevention, but for shooting there is a sanity check. Before spawning the authoritative bullet, the server validates the shot\'s origin (max distance from player position) and direction (max angle from player forward). Invalid shots are silently rejected.',
            snippet: {
              label: 'PlayerShoot.cs — ValidateShot()',
              lang: 'csharp',
              code: `private bool ValidateShot(ulong clientId, Vector3 origin, Vector3 direction)
{
    NetworkObject player = NetworkManager.Singleton.ConnectedClients[clientId].PlayerObject;
    if (player == null) return false;

    Transform playerTransform = player.transform;

    if (Vector3.Distance(origin, playerTransform.position) > maxOriginError)
        return false;

    Vector3 flatPlayerForward = Vector3.ProjectOnPlane(playerTransform.forward, Vector3.up).normalized;
    Vector3 flatShotDirection = Vector3.ProjectOnPlane(direction, Vector3.up).normalized;

    float angle = Vector3.Angle(flatPlayerForward, flatShotDirection);
    if (angle > maxAngleError)
        return false;

    return true;
}`,
            },
          },
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Hiding the Network Bullet for the Shooter',
            description: 'After spawning the authoritative bullet, the server hides it for the shooting client via a targeted ClientRpc — so the shooter only sees their local client bullet, not a duplicate.',
            snippet: {
              label: 'NetworkBullet.cs — InitializeOnServer() + HideForShooterClientRpc()',
              lang: 'csharp',
              code: `public void InitializeOnServer(Vector3 direction, float speed, ulong shooterId)
{
    if (!IsServer) return;

    ownerClientId = shooterId;
    spawnTime = Time.time;
    rb = GetComponent<Rigidbody>();
    rb.linearVelocity = direction * speed;

    HideForShooterClientRpc(new ClientRpcParams
    {
        Send = new ClientRpcSendParams { TargetClientIds = new[] { shooterId } }
    });
}

[ClientRpc]
private void HideForShooterClientRpc(ClientRpcParams rpcParams)
{
    MeshRenderer meshRenderer = GetComponent<MeshRenderer>();
    if (meshRenderer != null)
        meshRenderer.enabled = false;
}`,
            },
          },
        ],
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>`,
        title: 'Treasure Tracking System',
        description: 'There are many chests hidden on the island. Each player\'s minimap only shows some of the chests, and markers disappear when a chest is opened.',
        subfeatures: [
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Server-Side Chest Assignment',
            description: 'On game start, the server shuffles all chests and assigns them to players.',
            snippet: {
              label: 'ChestManager.cs — BuildAssignmentsServer()',
              lang: 'csharp',
              code: `private void BuildAssignmentsServer()
{
    var chestComponents = new List<Chest>(GetComponentsInChildren<Chest>(true));

    // Shuffle for random distribution
    for (int i = chestComponents.Count - 1; i > 0; i--)
    {
        int j = UnityEngine.Random.Range(0, i + 1);
        (chestComponents[i], chestComponents[j]) = (chestComponents[j], chestComponents[i]);
    }

    // Round-robin assign so each player gets a roughly equal share
    for (int i = 0; i < chestComponents.Count; i++)
    {
        var c = chestComponents[i];
        int assigned = expectedPlayerCount > 0 ? (i % expectedPlayerCount) : 0;

        var entry = new ChestEntry
        {
            Id = i,
            Position = c.transform.position,
            AssignedIndex = assigned,
            IsOpened = false,
        };

        Chests.Add(entry);
        c.SetManagerIndex(i);
    }
}`,
            },
          },
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Reactive Minimap Markers',
            description: 'MapMarkerManager subscribes to ChestManager.Chests.OnListChanged and creates or destroys minimap markers reactively. When any player opens a chest, thanks to the NetworkList the marker disappears for the corresponding player.',
            snippet: {
              label: 'MapMarkerManager.cs — OnChestListChanged() + TryEnsureMarker()',
              lang: 'csharp',
              code: `private void OnChestListChanged(NetworkListEvent<ChestEntry> change)
{
    switch (change.Type)
    {
        case NetworkListEvent<ChestEntry>.EventType.Add:
        case NetworkListEvent<ChestEntry>.EventType.Value:
            TryEnsureMarker(change.Value);
            break;
        case NetworkListEvent<ChestEntry>.EventType.Remove:
            RemoveMarker(change.Value.Id);
            break;
        case NetworkListEvent<ChestEntry>.EventType.Clear:
            ClearAllMarkers();
            break;
        default:
            RefreshAllMarkers();
            break;
    }
}

private void TryEnsureMarker(ChestEntry entry)
{
    bool shouldShow = entry.AssignedIndex == playerIndex && !entry.IsOpened;
    if (shouldShow)
    {
        if (_markers.ContainsKey(entry.Id)) return;
        var go = Instantiate(markerPrefab, mapPanel);
        go.GetComponent<RectTransform>().localPosition = WorldToMap(entry.Position);
        _markers[entry.Id] = go;
    }
    else
    {
        RemoveMarker(entry.Id);
    }
}`,
            },
          },
        ],
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-waypoints-icon lucide-waypoints"><path d="m10.586 5.414-5.172 5.172"/><path d="m18.586 13.414-5.172 5.172"/><path d="M6 12h12"/><circle cx="12" cy="20" r="2"/><circle cx="12" cy="4" r="2"/><circle cx="20" cy="12" r="2"/><circle cx="4" cy="12" r="2"/></svg>`,
        title: 'Networked Interaction System',
        description: 'The interaction system is server-authoritative. It is built around an abstract NetworkInteractable base class. An interactable can be added by overriding HandleInteract.',
        subfeatures: [
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'NetworkInteractable Base Class',
            description: 'NetworkInteractable ensures all interactions are routed to the server by running HandleInteract directly on the host, or via a ServerRpc on clients. Subclasses do not need to implement network logic — only override HandleInteract.',
            snippet: {
              label: 'NetworkInteractable.cs',
              lang: 'csharp',
              code: `public abstract class NetworkInteractable : NetworkBehaviour, IInteractable
{
    public void OnInteract(ulong playerId)
    {
        if (IsServer)
            HandleInteract(playerId);
        else if (IsClient)
            RequestInteractRpc(playerId);
    }

    [Rpc(SendTo.Server, RequireOwnership = false)]
    private void RequestInteractRpc(ulong playerId)
    {
        HandleInteract(playerId);
    }

    protected abstract void HandleInteract(ulong playerId);
}`,
            },
          },
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Targeted Feedback RPC on Chest Open',
            description: 'When a chest is opened, the server sends FEEL feedback effects only to the player who opened it using RpcTarget.Single, so screenshake and other effects don\'t trigger on other players\' screens.',
            snippet: {
              label: 'ChestInteractable.cs — PlayChestFeedbacksForPlayer()',
              lang: 'csharp',
              code: `private void PlayChestFeedbacksForPlayer(ulong playerId)
{
    if (!IsServer) return;

    RpcParams rpcParams = new RpcSendParams();
    rpcParams.Send.Target = RpcTarget.Single(playerId, RpcTargetUse.Temp);
    PlayChestFeedbacksClientRpc(rpcParams);
}

[Rpc(SendTo.SpecifiedInParams)]
private void PlayChestFeedbacksClientRpc(RpcParams rpcSendParams = default)
{
    var localPlayer = NetworkManager.Singleton.LocalClient?.PlayerObject;
    if (localPlayer != null && localPlayer.TryGetComponent(out ChestOpenFeedbacks feedbacks))
        feedbacks.PlayChestFeedbacks();
}`,
            },
          },
        ],
      },
    ],
  },

  /* ─── PROJECT 3 ─────────────────────────────────────────────────── */
  'gba-homebrew': {
    title:    'Homebrew game for GBA',
    tags:     [],
    engine:   'Butano',
    lang:     'C++',
    jam:      '',
    thumb:    'assets/images/projects/game-three/screenshot2.png',
    cardDesc: 'A 2D platformer created for a university elective about retro consoles.',
    contributionsTitle: 'Features',
    contributions: ['Tile based 2D collisions', 'Health and damage', "Enemies", "Melee attack", 'Collectables'],
    links: [
      { label: 'Play on itch.io',         url: 'https://rognin.itch.io/homebrew' },
    ],
    duration:      '1 month',
    teamSize:      '3 people',
    role:          'Programmer',
    description:   'A game made for a university elective about programming for retro consoles. Built with Butano, a modern C++ engine for the GBA. The game is a 2D platformer where you play as a shepherd who needs to collect sheep stolen by wolves.',
    mediaType:     'image',
    mediaSrc:      'assets/images/projects/game-three/screenshot2.png',
    techStack:     ['Tiled'],
    featuresIntro: 'Here you can read about some of the features we have. Click on a section to expand it.',
    features: [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
        title: 'Tile-Based Collisions',
        description: 'The collision system in the game is tile-based. There are 8 x 8 (in pixels) tiles and a few types of slopes. Every frame, the player\'s hitbox is checked against the collision mask of the level. The collisions are resolved on the vertical and horizontal axes separately, with special handling for slopes.',
        subfeatures: [
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Slope Snapping',
            description: 'When the vertical collision pass setects that the player is on a slope, the Y-level the player should snap to is computed by linearly interpolating between the left and right edge heights of that slope tile.',
            snippet: {
              label: 'player_movement.cpp — vertical_collision(), slope branch',
              lang: 'cpp',
              code: `if(on_slope) {
    int slope_x = feet_pixel_x / tile_width;
    int slope_y = feet_pixel_y / tile_height;
    SlopeInfo s = get_slope_info(collision_data[slope_y][slope_x]);

    int feet_on_slope_x = feet_pixel_x - (slope_x * tile_width);

    // Linearly interpolate the surface Y across the slope tile
    bn::fixed t = bn::fixed(feet_on_slope_x) / tile_width;
    bn::fixed expected_offset =
        bn::fixed(slope_left_height) + t * (slope_right_height - slope_left_height);

    int collision_bottom = bottom_tile_check * tile_height;
    y = bn::fixed(collision_bottom - half_height + collision_box_offset_y - level_half_height + tile_height)
        - expected_offset;
    y_velocity = 0;
    on_ground = true;
    return;
}`,
            },
          },
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Slope Edge Case in Horizontal Collision',
            description: 'There are multiple edge cases to consider when it comes to tile based collisions. Here\'s one of them: when the player is on a slope, the player\'s hitbox might overlap with the solid tile right next to the slope tile, causing a false horizontal collision. To avoid this, the bottom rows of the horizontal collision check are skipped when on a slope.',
            snippet: {
              label: 'player_movement.cpp — horizontal_collision()',
              lang: 'cpp',
              code: `// When on a slope, skip the two bottom tile rows from the horizontal sweep.
// Without this, the solid tile behind the slope base triggers a
// false wall collision and stops the player mid-slope.
if(on_slope){
    loop_bottom -= 2;
}`,
            },
          },
        ],
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sword-icon lucide-sword"><path d="m11 19-6-6"/><path d="m5 21-2-2"/><path d="m8 16-4 4"/><path d="M9.5 17.5 21 6V3h-3L6.5 14.5"/></svg>`,
        title: 'Melee Attack',
        description: 'Pressing A spawns an attack hitbox in front of the player for 10 frames. The hitbox tracks the player\'s position each frame and is automatically destroyed when its frame count expires. In this version of the game the hitboxes are hardcoded :)',
        subfeatures: [
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Hitbox Creation',
            description: 'The hitbox is offset to the left or right depending on which way the player is facing, and is active for a set number of frames.',
            snippet: {
              label: 'player_movement.cpp — update_state()',
              lang: 'cpp',
              code: `if(bn::keypad::a_pressed() && !attack_active) {
    bn::sound_items::attack.play();
    currentState = ATTACKING;
    attack_active = true;

    current_attack = {
        current_attack.x = x.floor_integer() + (facing_left ? -half_width : half_width)
                           + (facing_left ? -8 : 8) - 8,
        current_attack.y = y.floor_integer() - 8,
        16,  // width
        16,  // height
        1,   // damage
        10   // active for 10 frames
    };
    return;
}`,
            },
          },
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Hit Detection with Invincibility Frames',
            description: 'Each frame, enemies check if their hitbox and the player\'s attack hitbox overlap. A hit starts an invincibility timer that prevents multiple hits with one attack.',
            snippet: {
              label: 'enemy.cpp — check_hit()',
              lang: 'cpp',
              code: `void enemy::check_hit(bn::fixed attack_x, bn::fixed attack_y, bool player_attacking) {
    if(invincibility_timer > 0) return;

    if (player_attacking && aabb_overlap(x - 16, y, 32, 16, attack_x, attack_y, 16, 16)) {
        health--;
        invincibility_timer = invincibility_frames;
        if (health <= 0)
            on_death();
    }
}`,
            },
          },
        ],
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-paw-print-icon lucide-paw-print"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/></svg>`,
        title: 'Enemies',
        description: 'There are patrolling enemiy-wolves. When killed, they drop a sheep collectable at their position.',
        subfeatures: [
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Patrol + Damage Blink',
            description: 'Enemies simply walk left and right between two points. During invincibility frames after taking a hit, the sprite toggles visibility every 4 frames to produce a blink effect.',
            snippet: {
              label: 'enemy.cpp — update()',
              lang: 'cpp',
              code: `void enemy::update() {
    if(health <= 0) return;

    if (invincibility_timer > 0) {
        invincibility_timer--;
        sprite.set_visible((invincibility_timer / 4) % 2); // blink while damaged
    } else {
        sprite.set_visible(true);
    }

    bn::fixed direction = facing_left ? -1 : 1;
    x += direction * speed;

    if (x < initial_x - movement_range) {
        x = initial_x - movement_range;
        facing_left = false;
    } else if (x > initial_x + movement_range) {
        x = initial_x + movement_range;
        facing_left = true;
    }

    sprite.set_x(x);
    sprite.set_horizontal_flip(!facing_left);
}`,
            },
          },
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Drop on Death',
            description: 'After an enemy dies it spawns a sheep collectable at its world position, so killing enemies is a way to get more sheep, which means more points.',
            snippet: {
              label: 'main.cpp — enemy update loop',
              lang: 'cpp',
              code: `for(int i = enemies.size() - 1; i >= 0; i--) {
    enemies[i].update();
    enemies[i].check_hit(
        player.current_attack.x, player.current_attack.y, player.attack_active
    );

    if(!enemies[i].is_alive()) {
        sheep_manager_1.spawn_sheep_at(enemies[i].get_x(), enemies[i].get_y());
        enemies.erase(enemies.begin() + i);
    }
}`,
            },
          },
        ],
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
        title: 'Collectables',
        description: 'The sheep manager stores a pool of spawn points across the level. When a sheep is collected, a replacement immediately spawns at a random free spawn point, keeping the total count of sheep constant. Killing enemies increases the total count of sheep available. Everything resets on player death.',
        subfeatures: [
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Collection + Replacement',
            description: 'Each frame, sheep positions are checked against the player as a circle-to-circle collision. On contact, the sheep is removed, the collected count updates, and a replacement spawns at a random free spawn point.',
            snippet: {
              label: 'sheep_manager.cpp — update()',
              lang: 'cpp',
              code: `void sheep_manager::update(bn::fixed player_x, bn::fixed player_y) {
    for (int i = sheep_list.size() - 1; i >= 0; --i) {
        sheep_list[i].update();

        bn::fixed dx = sheep_list[i].get_x() - player_x;
        bn::fixed dy = sheep_list[i].get_y() - player_y;

        if (bn::abs(dx.integer()) < sheep_pickup_radius &&
            bn::abs(dy.integer()) < sheep_pickup_radius) {

            on_sheep_collected(sheep_list[i]);
            sheep_list.erase(sheep_list.begin() + i);
            collected_count++;
            update_counter();

            spawn_one_sheep(); // spawn a replacement to keep the count constant
        }
    }
}`,
            },
          },
        ],
      },
    ],
  },

  // ── Add more projects by copying a block above and giving it a new key ──

};
