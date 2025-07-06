/**
 * Tag Filter Manager
 * Handles collapsible tag filtering for companies and products pages
 */
class TagFilterManager {
  constructor() {
    this.isExpanded = false;
    this.selectedTags = [];
    this.searchMode = 'and'; // 'and' or 'or'
    this.allItems = [];
    this.filteredItems = [];
    this.allTags = new Set();
    this.tagCategories = {};
    this.currentLanguage = window.siteLanguage || 'ja';
    this.strings = window.tagFilterStrings || {};
    this.init();
  }

  init() {
    // Don't override this.currentLanguage - it's already set correctly in constructor
    this.loadAllItems();
    this.generateTagCategories();
    this.buildTagFilter();
    this.bindEvents();
    this.loadStateFromURL(); // Load URL state after everything is initialized
  }

  getCurrentLanguage() {
    return document.documentElement.lang || 
           (window.location.pathname.includes('/ja/') ? 'ja' : 'en');
  }

  loadAllItems() {
    const grid = document.getElementById('companies-grid') || document.getElementById('products-grid');
    if (grid) {
      this.allItems = Array.from(grid.children).map(card => {
        const title = card.querySelector('h3 a')?.textContent || '';
        const summary = card.querySelector('.company-summary, .product-summary')?.textContent || '';
        const tags = this.extractTagsFromCard(card);
        
        // Collect all unique tags
        tags.forEach(tag => this.allTags.add(tag));
        
        return {
          element: card,
          title: title,
          summary: summary,
          tags: tags
        };
      });
    }
  }

  extractTagsFromCard(card) {
    const tags = [];
    
    // Extract tags from data attributes (primary source)
    const tagData = card.dataset.tags;
    if (tagData && tagData.trim()) {
      tags.push(...tagData.split(',').map(tag => tag.trim()).filter(tag => tag));
    }
    
    return [...new Set(tags)]; // Remove duplicates
  }

  generateTagCategories() {
    const tags = Array.from(this.allTags);
    
    // Define category rules for automatic classification
    const categoryRules = {
      'region': {
        'patterns': [
          // Countries/Regions in Japanese
          /^(日本|中国|アメリカ|ドイツ|イギリス|フランス|イタリア|カナダ|デンマーク|スウェーデン|オーストリア|スイス|フィンランド|香港|韓国|台湾|シンガポール|ノルウェー|オランダ|ベルギー|スペイン|ポルトガル|ロシア|インド|ブラジル|オーストラリア|ニュージーランド|Utah|California|ミネソタ|イリノイ|英国|ユタ州|カリフォルニア|ニューヨーク|テキサス|フロリダ|バイエルン|バーデン|ロンバルディア|トスカーナ|プロヴァンス|ブルターニュ|スコットランド|ウェールズ|北アイルランド|イングランド)$/,
          // Countries/Regions in English
          /^(Japan|China|USA|America|Germany|UK|Britain|France|Italy|Canada|Denmark|Sweden|Austria|Switzerland|Finland|Hong Kong|Korea|Taiwan|Singapore|Norway|Netherlands|Belgium|Spain|Portugal|Russia|India|Brazil|Australia|New Zealand|Utah|California|Minnesota|Illinois|New York|Texas|Florida|Bavaria|Baden|Lombardy|Tuscany|Provence|Brittany|Scotland|Wales|Northern Ireland|England)$/i
        ]
      },
      'category': {
        'patterns': [
          // Product categories in Japanese
          /^(IEM|イヤホン|ヘッドホン|スピーカー|DAC|アンプ|ケーブル|マイクロホン|ターンテーブル|レコードプレーヤー|プリメインアンプ|AVアンプ|ストリーマー|ネットワークプレーヤー|電源|フィルター|静電型|イヤースピーカー|楽器|室内音響補正|オーディオインターフェース|真空管|測定マイク|測定機器|アクセサリー|オーディオソフトウェア|ハードウェア|平面磁界|同軸ドライバー|コンセントリック|フルレンジドライバー|トゥイーター|ウーファー|ミッドレンジ|サブウーファー|パワーアンプ|プリアンプ|統合アンプ|モノブロック|AVレシーバー|フォノアンプ|ヘッドホンアンプ|ライン出力|DAP|ポータブルアンプ|ネットワークオーディオ|ストリーミング|USB-DAC|光デジタル|同軸デジタル|XLR|RCA|TRS|バナナプラグ|スピーカーケーブル|インターコネクト|デジタルケーブル|光ケーブル|同軸ケーブル|USBケーブル|電源ケーブル|アース線|ラックマウント|デスクトップ|ポータブル|バッテリー駆動|AC駆動|DC駆動)$/i,
          // Product categories in English
          /^(Audio|IEM|Headphones|Speakers|Amplifier|Cables|Microphones|Turntables|Integrated Amplifier|AV Receiver|Streamer|Network Player|Power Supply|Filter|Electrostatic|Ear Speakers|Instruments|Room Acoustic Correction|Audio Interface|Vacuum Tube|Measurement Microphone|Measurement Equipment|Accessories|Audio Software|Hardware|Coaxial Driver|Concentric|Full Range Driver|Tweeter|Woofer|Midrange|Subwoofer|Power Amplifier|Preamplifier|Monoblock|AV Receiver|Phono Amplifier|Headphone Amplifier|Line Output|DAP|Portable Amplifier|Network Audio|Streaming|USB DAC|Optical Digital|Coaxial Digital|XLR|RCA|TRS|Banana Plug|Speaker Cable|Interconnect|Digital Cable|Optical Cable|Coaxial Cable|USB Cable|Power Cable|Ground Wire|Rack Mount|Desktop|Portable|Battery Powered|AC Powered|DC Powered|AirPods|Beats|Sonova)$/i
        ]
      },
      'technology': {
        'patterns': [
          // Technology features in Japanese
          /^(ハイエンド|ワイヤレス|ノイズキャンセリング|Chi-Fi|高コスパ|コスパ|ハイブリッド|ダイナミックドライバー|バランスドアーマチュア|フルデジタル|DSP|MQA|DSD|LDAC|aptX|高効率|低歪み|超低歪み|革命的製品|レガシー製品|生産終了|高コストパフォーマンス|低価格|予算|エントリー|中級|上級|CNC加工|アルミニウム|ベリリウム|木工芸術|手作り|家族経営|老舗|廃業|新興企業|タイムコヒーレント|位相コヒーレント|透明性|高級|ラグジュアリー|オカルト|科学的設計|技術革新|AI技術|VRM技術|高精度|測定器レベル|クラシック|現代的|伝統的|革新的|先進的|コスト重視|性能重視|品質重視|信頼性|耐久性|長期使用|短期使用|経年劣化|メンテナンス|サポート|アフターサービス|保証|修理|交換|アップグレード|拡張性|互換性|標準化|カスタマイズ|調整可能|設定可能|プログラム可能|自動調整|手動調整|リモート制御|アプリ制御|ワイヤレス制御|有線制御|デジタル制御|アナログ制御|ハイブリッド制御)$/i,
          // Technology features in English
          /^(High-End|Wireless|Noise-Cancelling|Chi-Fi|Hybrid|Dynamic Driver|Balanced Armature|Full Digital|High Efficiency|Low Distortion|Revolutionary Product|Legacy Product|Discontinued|High Cost Performance|Budget|Entry Level|Mid Level|High Level|CNC Machining|Aluminum|Beryllium|Woodcraft|Handmade|Family Business|Established|Bankrupt|Startup|Time Coherent|Phase Coherent|Transparency|Luxury|Occult|Scientific Design|Technical Innovation|AI Technology|VRM Technology|High Precision|Measurement Level|Classic|Modern|Traditional|Innovative|Advanced|Cost Focused|Performance Focused|Quality Focused|Reliability|Durability|Long Term Use|Short Term Use|Aging|Maintenance|Support|After Service|Warranty|Repair|Replacement|Upgrade|Expandability|Compatibility|Standardization|Customization|Adjustable|Configurable|Programmable|Auto Adjustment|Manual Adjustment|Remote Control|App Control|Wireless Control|Wired Control|Digital Control|Analog Control|Hybrid Control|Planar Magnetic|Open-back|Closed-back|Semi-open|Spatial Audio|Noise Cancelling|True Wireless|Wired|Bluetooth|USB-C|Lightning|3.5mm|6.35mm|XLR|Balanced|Unbalanced|Hi-Res|Lossless|Lossy|DSD|MQA|FLAC|MP3|AAC|LDAC|aptX|SBC|Impedance|Sensitivity|Frequency Response|THD|SNR|Dynamic Range|Soundstage|Imaging|Separation|Detail|Clarity|Warmth|Brightness|Neutrality|Coloration|Fatigue|Comfort|Build Quality|Materials|Drivers|Diaphragm|Magnet|Voice Coil|Crossover)$/i
        ]
      },
      'purpose': {
        'patterns': [
          // Purpose/Usage in Japanese
          /^(音楽制作|スタジオモニター|業界標準|録音|プロ用|リファレンス|ホームシアター|DJ|ゲーミング|ポータブル|モニター|分析的|測定性能|コラボレーション|プロフェッショナル|測定重視|測定|分析|音質評価|正確性|忠実性|客観性|主観性|音楽性|芸術性|美的価値|ステータス|投資価値|資産価値|入門|初心者|中級者|上級者|専門家|愛好家|オーディオファイル|音楽愛好家|楽器愛好家|技術愛好家|音質重視|性能重視|価格重視|機能重視|デザイン重視|ブランド重視|個人使用|家庭使用|業務使用|商業使用|教育使用|研究使用|開発使用|試験使用|評価使用|比較使用|学習使用|訓練使用|練習使用|体験使用|娯楽使用|趣味使用|仕事使用|クリエイティブ|創作活動|作曲|編曲|ミキシング|マスタリング|録音制作|音響設計|音響測定|音響分析|音響評価|音響研究|音響開発|音響教育|音響コンサルティング|音響エンジニアリング|オーディオエンジニアリング|サウンドエンジニアリング|アコースティックエンジニアリング|電気音響工学|音響物理学|音響心理学|音響生理学|音響医学|聴覚学|補聴|聴力補助|聴力改善|聴力保護|聴力測定|聴覚検査|聴覚診断|聴覚治療|聴覚リハビリ|聴覚訓練|聴覚教育|聴覚研究|聴覚開発|聴覚評価|聴覚測定|聴覚分析|聴覚心理学|聴覚生理学|聴覚医学|聴覚工学|聴覚技術|聴覚機器|聴覚装置|聴覚システム|聴覚ソリューション|聴覚サポート|聴覚アシスト|聴覚補助|聴覚改善|聴覚保護|聴覚強化|聴覚最適化|聴覚カスタマイズ|聴覚パーソナライズ|聴覚個別化|聴覚特化|聴覚専門|聴覚プロフェッショナル|聴覚エキスパート|聴覚スペシャリスト|聴覚コンサルタント|聴覚アドバイザー|聴覚カウンセラー|聴覚セラピスト|聴覚トレーナー|聴覚インストラクター|聴覚エデュケーター|聴覚ティーチャー|聴覚レクチャラー|聴覚プロフェッサー|聴覚リサーチャー|聴覚サイエンティスト|聴覚テクニシャン|聴覚エンジニア|聴覚デザイナー|聴覚アーキテクト|聴覚プランナー|聴覚ストラテジスト|聴覚アナリスト|聴覚コンサルタント)$/i,
          // Purpose/Usage in English
          /^(Music Production|Studio Monitor|Industry Standard|Recording|Professional|Reference|Home Theater|Portable|Gaming|Monitor|Analytical|Measurement Performance|Collaboration|Measurement Focused|Measurement|Analysis|Sound Quality Evaluation|Accuracy|Fidelity|Objectivity|Subjectivity|Musicality|Artistry|Aesthetic Value|Status|Investment Value|Asset Value|Entry|Beginner|Intermediate|Advanced|Expert|Enthusiast|Audiophile|Music Lover|Instrument Lover|Technology Enthusiast|Sound Quality Focused|Performance Focused|Price Focused|Function Focused|Design Focused|Brand Focused|Personal Use|Home Use|Business Use|Commercial Use|Educational Use|Research Use|Development Use|Testing Use|Evaluation Use|Comparison Use|Learning Use|Training Use|Practice Use|Experience Use|Entertainment Use|Hobby Use|Work Use|Creative|Creative Activity|Composition|Arrangement|Mixing|Mastering|Recording Production|Acoustic Design|Acoustic Measurement|Acoustic Analysis|Acoustic Evaluation|Acoustic Research|Acoustic Development|Acoustic Education|Acoustic Consulting|Acoustic Engineering|Audio Engineering|Sound Engineering|Acoustical Engineering|Electroacoustic Engineering|Acoustic Physics|Acoustic Psychology|Acoustic Physiology|Acoustic Medicine|Audiology|Hearing Aid|Hearing Assistance|Hearing Improvement|Hearing Protection|Hearing Measurement|Hearing Test|Hearing Diagnosis|Hearing Treatment|Hearing Rehabilitation|Auditory Training|Auditory Education|Auditory Research|Auditory Development|Auditory Evaluation|Auditory Measurement|Auditory Analysis|Auditory Psychology|Auditory Physiology|Auditory Medicine|Auditory Engineering|Auditory Technology|Auditory Equipment|Auditory Device|Auditory System|Auditory Solution|Auditory Support|Auditory Assist|Auditory Aid|Auditory Improvement|Auditory Protection|Auditory Enhancement|Auditory Optimization|Auditory Customization|Auditory Personalization|Auditory Individualization|Auditory Specialization|Auditory Professional|Auditory Expert|Auditory Specialist|Auditory Consultant|Auditory Advisor|Auditory Counselor|Auditory Therapist|Auditory Trainer|Auditory Instructor|Auditory Educator|Auditory Teacher|Auditory Lecturer|Auditory Professor|Auditory Researcher|Auditory Scientist|Auditory Technician|Auditory Engineer|Auditory Designer|Auditory Architect|Auditory Planner|Auditory Strategist|Auditory Analyst|Auditory Consultant|DJ|Gaming|Fitness|Sports|Commuting|Travel|Office|Study|Sleep|Meditation|Exercise|Workout|Running|Cycling|Flying|Walking|Driving|Cooking|Cleaning|Reading|Writing|Relaxation|Entertainment|Movies|TV|Podcast|Audiobook|Conference|Call|Meeting|Presentation|Streaming|Broadcasting|Live|Concert|Festival|Party|Club|Bar|Restaurant|Hotel|Airport|Train|Bus|Subway|Plane|Car|Motorcycle|Bicycle|Boat|Ship|Home|Garden|Patio|Balcony|Terrace|Roof|Basement|Garage|Attic|Shed|Cabin|Cottage|Villa|Apartment|Condo|Loft|Studio|Office|Factory|Warehouse|Store|Shop|Mall|Market|Hospital|Clinic|School|University|Library|Museum|Gallery|Theater|Cinema|Stadium|Arena|Park|Beach|Forest|Mountain|Desert|Lake|River|Ocean|Island|City|Town|Village|Farm|Ranch|Camping|Hiking|Backpacking|Trekking|Climbing|Skiing|Snowboarding|Surfing|Swimming|Diving|Fishing|Hunting|Shooting|Archery|Golf|Tennis|Football|Basketball|Baseball|Soccer|Hockey|Cricket|Rugby|Volleyball|Badminton|Squash|Ping Pong|Bowling|Billiards|Darts|Chess|Checkers|Backgammon|Poker|Blackjack|Roulette|Slots|Lottery|Bingo|Karaoke|Dancing|Singing|Playing|Instrument|Piano|Guitar|Violin|Drum|Saxophone|Trumpet|Flute|Harmonica|Accordion|Organ|Harp|Cello|Bass|Banjo|Mandolin|Ukulele|Recorder|Clarinet|Oboe|Bassoon|Tuba|Trombone|French Horn|Percussion|Xylophone|Marimba|Vibraphone|Timpani|Cymbal|Triangle|Tambourine|Cowbell|Shaker|Rattle|Whistle|Kazoo|Melodica|Theremin|Synthesizer|Keyboard|Sampler|Sequencer|Mixer|Amplifier|Speaker|Headphone|Earphone|Microphone|Recording|Editing|Mixing|Mastering|Composing|Arranging|Producing|Engineering|Mixing|Mastering|Remixing|Scratching|Beatmatching|Cueing|Looping|Sampling|Sequencing|Programming|Triggering|Controlling|Monitoring|Analyzing|Measuring|Testing|Evaluating|Comparing|Reviewing|Rating|Ranking|Scoring|Grading|Judging|Critiquing|Assessing|Appraising|Estimating|Calculating|Computing|Processing|Analyzing|Interpreting|Understanding|Learning|Teaching|Training|Coaching|Mentoring|Tutoring|Instructing|Educating|Informing|Explaining|Demonstrating|Showing|Guiding|Directing|Leading|Managing|Supervising|Overseeing|Coordinating|Organizing|Planning|Scheduling|Timing|Synchronizing|Aligning|Matching|Pairing|Coupling|Connecting|Linking|Bonding|Joining|Merging|Combining|Integrating|Unifying|Harmonizing|Balancing|Equalizing|Adjusting|Tuning|Calibrating|Optimizing|Enhancing|Improving|Upgrading|Updating|Modifying|Customizing|Personalizing|Individualizing|Specializing|Focusing|Concentrating|Intensifying|Amplifying|Boosting|Strengthening|Reinforcing|Supporting|Assisting|Helping|Aiding|Facilitating|Enabling|Empowering|Motivating|Inspiring|Encouraging|Stimulating|Energizing|Activating|Triggering|Initiating|Starting|Beginning|Launching|Introducing|Presenting|Demonstrating|Showcasing|Displaying|Exhibiting|Featuring|Highlighting|Emphasizing|Stressing|Accentuating|Underlining|Pointing|Indicating|Signaling|Marking|Labeling|Tagging|Categorizing|Classifying|Sorting|Grouping|Organizing|Arranging|Structuring|Formatting|Styling|Designing|Creating|Building|Constructing|Developing|Producing|Manufacturing|Making|Crafting|Shaping|Forming|Molding|Sculpting|Carving|Cutting|Trimming|Polishing|Finishing|Completing|Finalizing|Wrapping|Packaging|Shipping|Delivering|Transporting|Moving|Transferring|Relocating|Migrating|Traveling|Journeying|Touring|Exploring|Discovering|Finding|Locating|Positioning|Placing|Setting|Installing|Mounting|Attaching|Connecting|Plugging|Wiring|Cabling|Networking|Communicating|Transmitting|Broadcasting|Streaming|Sharing|Distributing|Spreading|Disseminating|Publishing|Releasing|Launching|Unveiling|Revealing|Exposing|Showing|Displaying|Presenting|Demonstrating|Performing|Playing|Acting|Entertaining|Amusing|Delighting|Pleasing|Satisfying|Fulfilling|Completing|Achieving|Accomplishing|Succeeding|Winning|Triumphing|Conquering|Overcoming|Surpassing|Exceeding|Outperforming|Beating|Defeating|Dominating|Ruling|Governing|Controlling|Managing|Directing|Leading|Commanding|Ordering|Instructing|Telling|Asking|Requesting|Demanding|Requiring|Needing|Wanting|Desiring|Wishing|Hoping|Expecting|Anticipating|Predicting|Forecasting|Projecting|Estimating|Calculating|Computing|Processing|Analyzing|Interpreting|Understanding|Comprehending|Grasping|Realizing|Recognizing|Identifying|Distinguishing|Differentiating|Discriminating|Separating|Dividing|Splitting|Breaking|Cracking|Shattering|Destroying|Demolishing|Wrecking|Ruining|Damaging|Harming|Hurting|Injuring|Wounding|Bleeding|Bruising|Scratching|Cutting|Slicing|Chopping|Dicing|Mincing|Grinding|Crushing|Smashing|Pounding|Hammering|Hitting|Striking|Punching|Kicking|Stomping|Stepping|Walking|Running|Jogging|Sprinting|Dashing|Rushing|Hurrying|Racing|Competing|Contesting|Challenging|Opposing|Resisting|Fighting|Battling|Struggling|Striving|Trying|Attempting|Endeavoring|Effort|Work|Labor|Toil|Sweat|Strain|Stress|Pressure|Tension|Anxiety|Worry|Concern|Fear|Dread|Terror|Horror|Panic|Alarm|Alert|Warning|Caution|Care|Attention|Focus|Concentration|Intensity|Power|Strength|Force|Energy|Vigor|Vitality|Life|Spirit|Soul|Heart|Mind|Brain|Thought|Idea|Concept|Notion|Understanding|Knowledge|Wisdom|Intelligence|Smartness|Cleverness|Brilliance|Genius|Talent|Skill|Ability|Capability|Capacity|Potential|Possibility|Opportunity|Chance|Luck|Fortune|Fate|Destiny|Purpose|Meaning|Significance|Importance|Value|Worth|Merit|Quality|Excellence|Perfection|Ideal|Standard|Benchmark|Reference|Criteria|Requirement|Specification|Demand|Need|Want|Desire|Wish|Hope|Dream|Vision|Goal|Objective|Target|Aim|Purpose|Intention|Plan|Strategy|Tactic|Approach|Method|Technique|Way|Manner|Style|Fashion|Trend|Fashion|Mode|Custom|Tradition|Culture|Society|Community|Group|Team|Organization|Institution|Company|Corporation|Business|Enterprise|Venture|Project|Initiative|Program|Campaign|Movement|Cause|Mission|Vision|Purpose|Goal|Objective|Target|Aim|Intention|Plan|Strategy|Tactic|Approach|Method|Technique|Way|Manner|Style|Fashion|Trend|Fashion|Mode|Custom|Tradition|Culture|Society|Community|Group|Team|Organization|Institution|Company|Corporation|Business|Enterprise|Venture|Project|Initiative|Program|Campaign|Movement|Cause|Mission)$/i
        ]
      }
    };

    // Initialize categories
    Object.keys(categoryRules).forEach(categoryKey => {
      this.tagCategories[categoryKey] = {
        'tags': []
      };
    });

    // Create "other" category for uncategorized tags
    this.tagCategories['other'] = {
      'tags': []
    };

    // Categorize tags
    tags.forEach(tag => {
      let categorized = false;
      
      for (const [categoryKey, categoryRule] of Object.entries(categoryRules)) {
        for (const pattern of categoryRule.patterns) {
          if (pattern.test(tag)) {
            this.tagCategories[categoryKey].tags.push(tag);
            categorized = true;
            break;
          }
        }
        if (categorized) break;
      }
      
      // If tag doesn't match any category, put it in "other"
      if (!categorized) {
        this.tagCategories['other'].tags.push(tag);
      }
    });

    // Remove empty categories
    Object.keys(this.tagCategories).forEach(categoryKey => {
      if (this.tagCategories[categoryKey].tags.length === 0) {
        delete this.tagCategories[categoryKey];
      }
    });
  }

  getCategoryName(categoryKey) {
    const categoryMappings = {
      'region': 'region',
      'category': 'productCategory',
      'technology': 'technologyFeatures',
      'purpose': 'purpose',
      'other': 'other'
    };
    
    const mappedKey = categoryMappings[categoryKey];
    return this.strings[mappedKey] || categoryKey;
  }

  buildTagFilter() {
    const filterSection = document.getElementById('tag-filter-section');
    if (!filterSection) return;

    const tagCounts = this.calculateTagCounts();
    const categoriesHtml = this.buildCategoriesHtml(tagCounts);
    
    const labels = this.getLabels();

    filterSection.innerHTML = `
      <div class="tag-filter-toggle" id="tag-filter-toggle">
        <span>🏷️ ${labels.filterTitle}</span>
        <div class="search-mode-toggle" id="search-mode-toggle" style="display: none;">
          <label class="search-mode-radio">
            <input type="radio" name="search-mode" value="and" checked>
            <span>AND</span>
          </label>
          <label class="search-mode-radio">
            <input type="radio" name="search-mode" value="or">
            <span>OR</span>
          </label>
        </div>
        <span class="tag-filter-toggle-icon" id="toggle-icon">▼</span>
      </div>
      
      <div class="tag-filter-panel" id="tag-filter-panel">
        <div class="tag-filter-content">
          <div class="tag-categories">
            ${categoriesHtml}
          </div>
          
          <div class="selected-tags" id="selected-tags" style="display: none;">
            <h5>${labels.selectedTags}</h5>
            <div class="selected-tag-list" id="selected-tag-list"></div>
          </div>
          
          <div class="filter-actions">
            <button class="clear-filters-btn" id="clear-filters" style="display: none;">${labels.clearFilters}</button>
          </div>
        </div>
      </div>
    `;
  }
  
  getLabels() {
    return {
      filterTitle: this.strings.filterTitle || 'タグで絞り込み',
      selectedTags: this.strings.selectedTags || '選択中のタグ:',
      clearFilters: this.strings.clearFilters || 'フィルタークリア'
    };
  }

  calculateTagCounts() {
    const tagCounts = {};
    this.allItems.forEach(item => {
      item.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    return tagCounts;
  }

  buildCategoriesHtml(tagCounts) {
    return Object.entries(this.tagCategories).map(([categoryKey, category]) => {
      const categoryName = this.getCategoryName(categoryKey);
      const relevantTags = category.tags.filter(tag => tagCounts[tag] > 0);
      
      if (relevantTags.length === 0) return '';

      const sortedTags = relevantTags.sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0));
      const visibleTags = sortedTags.slice(0, 6);
      const hiddenTags = sortedTags.slice(6);

      const visibleTagsHtml = visibleTags
        .map(tag => `
          <div class="tag-checkbox-item">
            <input type="checkbox" class="tag-checkbox" value="${tag}" id="tag-${tag.replace(/\s+/g, '-')}">
            <label class="tag-label" for="tag-${tag.replace(/\s+/g, '-')}">
              ${tag} <span class="tag-count">(${tagCounts[tag] || 0})</span>
            </label>
          </div>
        `).join('');

      const hiddenTagsHtml = hiddenTags
        .map(tag => `
          <div class="tag-checkbox-item">
            <input type="checkbox" class="tag-checkbox" value="${tag}" id="tag-${tag.replace(/\s+/g, '-')}">
            <label class="tag-label" for="tag-${tag.replace(/\s+/g, '-')}">
              ${tag} <span class="tag-count">(${tagCounts[tag] || 0})</span>
            </label>
          </div>
        `).join('');

      const moreButton = hiddenTags.length > 0 ? `
        <div class="tag-more-section">
          <button class="tag-more-button" data-category="${categoryKey}">
            <span class="more-text">more... (+${hiddenTags.length})</span>
            <span class="less-text" style="display: none;">less...</span>
          </button>
          <div class="tag-hidden-list">
            ${hiddenTagsHtml}
          </div>
        </div>
      ` : '';

      return `
        <div class="tag-category">
          <h4>${categoryName}</h4>
          <div class="tag-checkbox-list">
            ${visibleTagsHtml}
            ${moreButton}
          </div>
        </div>
      `;
    }).join('');
  }

  bindEvents() {
    const toggleButton = document.getElementById('tag-filter-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => this.togglePanel());
    }

    // Prevent search mode toggle from closing the panel
    document.addEventListener('click', (e) => {
      if (e.target.closest('#search-mode-toggle')) {
        e.stopPropagation();
      }
    });

    document.addEventListener('change', (e) => {
      if (e.target.classList.contains('tag-checkbox')) {
        this.handleTagSelection(e.target);
      } else if (e.target.name === 'search-mode') {
        this.handleSearchModeChange(e.target);
      }
    });

    document.addEventListener('click', (e) => {
      const moreButton = e.target.closest('.tag-more-button');
      if (moreButton) {
        this.handleMoreButtonClick(moreButton);
      }
    });

    const clearButton = document.getElementById('clear-filters');
    if (clearButton) {
      clearButton.addEventListener('click', () => this.clearAllFilters());
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => this.loadStateFromURL());
    
    // Handle window resize
    window.addEventListener('resize', () => {
      if (this.isExpanded) {
        this.adjustPanelHeight();
      }
    });
  }

  togglePanel() {
    this.isExpanded = !this.isExpanded;
    const panel = document.getElementById('tag-filter-panel');
    const icon = document.getElementById('toggle-icon');
    const searchModeToggle = document.getElementById('search-mode-toggle');
    
    if (!panel || !icon) return;

    if (this.isExpanded) {
      // Show full content without height restrictions
      panel.style.maxHeight = panel.scrollHeight + 'px';
      icon.textContent = '▲';
      panel.classList.add('expanded');
      if (searchModeToggle && this.selectedTags.length > 0) {
        searchModeToggle.style.display = 'flex';
      }
    } else {
      panel.style.maxHeight = '0';
      icon.textContent = '▼';
      panel.classList.remove('expanded');
      if (searchModeToggle) {
        searchModeToggle.style.display = 'none';
      }
    }
  }

  expandPanel() {
    const panel = document.getElementById('tag-filter-panel');
    const icon = document.getElementById('toggle-icon');
    const searchModeToggle = document.getElementById('search-mode-toggle');
    
    if (!panel || !icon) return;
    
    // Only expand if not already expanded
    if (!this.isExpanded) {
      this.isExpanded = true;
      // Show full content without height restrictions
      panel.style.maxHeight = panel.scrollHeight + 'px';
      icon.textContent = '▲';
      panel.classList.add('expanded');
      if (searchModeToggle && this.selectedTags.length > 0) {
        searchModeToggle.style.display = 'flex';
      }
    }
  }

  adjustPanelHeight() {
    const panel = document.getElementById('tag-filter-panel');
    if (!panel || !this.isExpanded) return;
    
    // Recalculate panel height to show all content
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }

  handleTagSelection(checkbox) {
    const tagValue = checkbox.value;
    
    if (checkbox.checked) {
      this.selectedTags.push(tagValue);
    } else {
      this.selectedTags = this.selectedTags.filter(tag => tag !== tagValue);
    }
    
    // Only filter if at least one tag is selected
    if (this.selectedTags.length > 0) {
      this.applyFilters();
    } else {
      this.showAllItems();
    }
    
    this.updateUI();
    this.updateURL();
  }

  handleSearchModeChange(radio) {
    this.searchMode = radio.value;
    
    // Re-apply filters with new search mode if tags are selected
    if (this.selectedTags.length > 0) {
      this.applyFilters();
    }
    
    this.updateURL();
  }

  handleMoreButtonClick(button) {
    const moreSection = button.closest('.tag-more-section');
    const hiddenList = moreSection.querySelector('.tag-hidden-list');
    const moreText = button.querySelector('.more-text');
    const lessText = button.querySelector('.less-text');
    
    if (hiddenList.classList.contains('show')) {
      // Hide tags
      hiddenList.classList.remove('show');
      moreText.style.display = 'inline';
      lessText.style.display = 'none';
    } else {
      // Show hidden tags
      hiddenList.classList.add('show');
      moreText.style.display = 'none';
      lessText.style.display = 'inline';
    }
    
    // Adjust panel height after content change
    setTimeout(() => {
      this.adjustPanelHeight();
    }, 350); // Wait for transition to complete
  }

  applyFilters() {
    this.filteredItems = this.allItems.filter(item => {
      if (this.searchMode === 'and') {
        // AND logic: item must have all selected tags
        return this.selectedTags.every(tag => item.tags.includes(tag));
      } else {
        // OR logic: item must have at least one selected tag
        return this.selectedTags.some(tag => item.tags.includes(tag));
      }
    });
    
    this.displayItems(this.filteredItems);
    this.updateResultCount();
  }

  showAllItems() {
    this.displayItems(this.allItems);
    this.updateResultCount();
  }

  displayItems(items) {
    const grid = document.getElementById('companies-grid') || document.getElementById('products-grid');
    if (!grid) return;

    // Hide all items first
    this.allItems.forEach(item => {
      item.element.style.display = 'none';
    });

    // Show filtered items
    items.forEach(item => {
      item.element.style.display = 'block';
    });
  }

  clearAllFilters() {
    this.selectedTags = [];
    this.searchMode = 'and';
    
    document.querySelectorAll('.tag-checkbox').forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // Reset search mode radio buttons
    const andRadio = document.querySelector('input[name="search-mode"][value="and"]');
    if (andRadio) andRadio.checked = true;
    
    this.showAllItems();
    this.updateUI();
    this.updateURL();
  }

  updateUI() {
    const selectedTagsDisplay = document.getElementById('selected-tags');
    const clearButton = document.getElementById('clear-filters');
    const searchModeToggle = document.getElementById('search-mode-toggle');
    
    if (this.selectedTags.length > 0) {
      selectedTagsDisplay.style.display = 'block';
      clearButton.style.display = 'inline-block';
      if (searchModeToggle && this.isExpanded) {
        searchModeToggle.style.display = 'flex';
      }
      this.renderSelectedTags();
    } else {
      selectedTagsDisplay.style.display = 'none';
      clearButton.style.display = 'none';
      if (searchModeToggle) {
        searchModeToggle.style.display = 'none';
      }
    }
  }

  renderSelectedTags() {
    const container = document.getElementById('selected-tag-list');
    if (!container) return;

    container.innerHTML = this.selectedTags.map(tag => `
      <span class="selected-tag">
        ${tag}
        <button class="selected-tag-remove" onclick="window.tagFilter.removeTag('${tag}')">×</button>
      </span>
    `).join('');
  }

  removeTag(tag) {
    this.selectedTags = this.selectedTags.filter(t => t !== tag);
    
    // Uncheck the corresponding checkbox
    const checkbox = document.querySelector(`input[value="${tag}"]`);
    if (checkbox) {
      checkbox.checked = false;
    }
    
    if (this.selectedTags.length > 0) {
      this.applyFilters();
    } else {
      this.showAllItems();
    }
    
    this.updateUI();
    this.updateURL();
  }

  updateResultCount() {
    const countElement = document.getElementById('result-count');
    if (!countElement) return;

    const total = this.allItems.length;
    const filtered = this.selectedTags.length > 0 ? this.filteredItems.length : total;
    
    const isCompanyPage = document.getElementById('companies-grid') !== null;
    
    let countText;
    if (this.selectedTags.length > 0) {
      // Show filtered count
      if (this.currentLanguage === 'ja') {
        const unit = isCompanyPage ? '社' : '製品';
        const showingText = isCompanyPage ? this.strings.companiesShowing : this.strings.productsShowing;
        countText = `${total}${unit}中${filtered}${unit}${showingText || 'を表示'}`;
      } else {
        const entityType = isCompanyPage ? 'companies' : 'products';
        const showingText = isCompanyPage ? this.strings.companiesShowing : this.strings.productsShowing;
        countText = `${showingText || 'Showing'} ${filtered} of ${total} ${entityType}`;
      }
    } else {
      // Show total count
      if (this.currentLanguage === 'ja') {
        const unit = isCompanyPage ? '社' : '製品';
        const available = isCompanyPage ? this.strings.companiesAvailable : this.strings.productsAvailable;
        countText = `${total}${available || (unit + 'のレビューを掲載中')}`;
      } else {
        const available = isCompanyPage ? this.strings.companiesAvailable : this.strings.productsAvailable;
        const fallback = isCompanyPage ? 'company reviews available' : 'product reviews available';
        countText = `${total} ${available || fallback}`;
      }
    }
    
    countElement.textContent = countText;
  }

  updateURL() {
    const url = new URL(window.location);
    
    if (this.selectedTags.length > 0) {
      url.searchParams.set('tags', this.selectedTags.join(','));
      url.searchParams.set('mode', this.searchMode);
    } else {
      url.searchParams.delete('tags');
      url.searchParams.delete('mode');
    }
    
    history.replaceState({}, '', url.toString());
  }

  loadStateFromURL() {
    const url = new URL(window.location);
    const tagsParam = url.searchParams.get('tags');
    const modeParam = url.searchParams.get('mode');
    
    // Reset all checkboxes and radio buttons first
    document.querySelectorAll('.tag-checkbox').forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // Set search mode from URL or default to 'and'
    this.searchMode = (modeParam === 'or') ? 'or' : 'and';
    const radioButton = document.querySelector(`input[name="search-mode"][value="${this.searchMode}"]`);
    if (radioButton) radioButton.checked = true;
    
    if (tagsParam && tagsParam.trim()) {
      this.selectedTags = tagsParam.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      // Check corresponding checkboxes
      document.querySelectorAll('.tag-checkbox').forEach(checkbox => {
        if (this.selectedTags.includes(checkbox.value)) {
          checkbox.checked = true;
        }
      });
      
      // Apply filters if tags are selected
      if (this.selectedTags.length > 0) {
        this.applyFilters();
        // Expand the panel if tags are selected
        this.expandPanel();
      } else {
        this.showAllItems();
      }
    } else {
      this.selectedTags = [];
      this.showAllItems();
    }
    
    this.updateUI();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.tagFilter = new TagFilterManager();
}); 