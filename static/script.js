// --- Blobs background ---
const blobColors = [
  'rgba(127,127,255,0.5)',
  'rgba(184,184,209,0.5)',
  'rgba(127,255,184,0.5)',
  'rgba(255,127,184,0.5)'
];
function createBlobs() {
  const blobBg = document.querySelector('.blob-bg');
  for (let i = 0; i < 6; i++) {
    const blob = document.createElement('div');
    blob.className = 'blob';
  blob.style.width = `${220 + Math.random()*180}px`;
  blob.style.height = `${220 + Math.random()*180}px`;
    blob.style.left = `${Math.random()*80}vw`;
    blob.style.top = `${Math.random()*80}vh`;
    blob.style.background = blobColors[i%blobColors.length];
  blob.style.animationDuration = `${8+Math.random()*6}s`;
    blobBg.appendChild(blob);
  }
}
createBlobs();

// --- Animated placeholder ---
const subjectPairs = [
  ["L2 Gradient Normalization", "the convergence of Adam Optimizer"],
  ["CRISPR gene editing", "disease resistance in plants"],
  ["quantum entanglement", "secure communication"],
  ["neural style transfer", "artistic image synthesis"],
  ["dark matter distribution", "galaxy formation"],
  ["protein folding", "drug discovery"],
  ["graph neural networks", "social network analysis"],
  ["microbiome diversity", "gut health"],
  ["synthetic biology", "biofuel production"],
  ["machine learning", "medical diagnostics"]
];
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
let pairIndex = 0;
function animatePairPlaceholders() {
  let charIndex1 = 0, charIndex2 = 0;
  let direction = 1;
  function typeInput1Write() {
    const text1 = subjectPairs[pairIndex][0];
    input1.placeholder = text1.slice(0, charIndex1);
    charIndex1++;
    if (charIndex1 > text1.length) {
      setTimeout(typeInput2Write, 600);
      return;
    }
    setTimeout(typeInput1Write, 60 + Math.random()*40);
  }
  function typeInput2Write() {
    const text2 = subjectPairs[pairIndex][1];
    input2.placeholder = text2.slice(0, charIndex2);
    charIndex2++;
    if (charIndex2 > text2.length) {
      setTimeout(typeInput1Erase, 600);
      return;
    }
    setTimeout(typeInput2Write, 60 + Math.random()*40);
  }
  function typeInput1Erase() {
    const text1 = subjectPairs[pairIndex][0];
    input1.placeholder = text1.slice(0, charIndex1);
    charIndex1--;
    if (charIndex1 < 0) {
      setTimeout(typeInput2Erase, 600);
      return;
    }
    setTimeout(typeInput1Erase, 60 + Math.random()*40);
  }
  function typeInput2Erase() {
    const text2 = subjectPairs[pairIndex][1];
    input2.placeholder = text2.slice(0, charIndex2);
    charIndex2--;
    if (charIndex2 < 0) {
      pairIndex = (pairIndex + 1) % subjectPairs.length;
      setTimeout(typeInput1Write, 600);
      return;
    }
    setTimeout(typeInput2Erase, 60 + Math.random()*40);
  }
  typeInput1Write();
}
animatePairPlaceholders();

// --- Pre-fill from URL params ---
function getParams() {
  const url = new URL(window.location);
  return {
    input1: url.searchParams.get('input1') || '',
    input2: url.searchParams.get('input2') || ''
  };
}
const params = getParams();
if (params.input1) input1.value = params.input1;
if (params.input2) input2.value = params.input2;

// --- Form submit ---
const form = document.getElementById('sentence-form');
const loadingBar = document.getElementById('loading-bar');
const resultSection = document.getElementById('result-section');
const conclusionTextarea = document.getElementById('conclusion');
const copyBtn = document.getElementById('copy-btn');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const val1 = input1.value.trim();
  const val2 = input2.value.trim();
  if (!val1 || !val2) return;
    // Show and animate loading bar
    loadingBar.classList.remove('hidden');
    loadingBar.style.width = '0';
    loadingBar.style.transition = 'none';
    setTimeout(() => {
      loadingBar.style.transition = 'width 1.2s cubic-bezier(.4,0,.2,1)';
      loadingBar.style.width = '100%';
    }, 50);
    // After loading, show result
    setTimeout(() => {
      loadingBar.style.width = '0';
      loadingBar.classList.add('hidden');
      resultSection.classList.remove('hidden');
      conclusionTextarea.value = `These findings suggest that ${val1} might influence ${val2}, although more research is needed to establish direct links between ${val1.toLowerCase()} and ${val2}.`;
      // Update URL
      const url = new URL(window.location);
      url.searchParams.set('input1', val1);
      url.searchParams.set('input2', val2);
      window.history.replaceState({}, '', url);
      showShareBtnIfMobile();
    }, 2000);
});

// --- Copy to clipboard ---
copyBtn.addEventListener('click', function() {
  conclusionTextarea.select();
  document.execCommand('copy');
  copyBtn.innerHTML = '<span>✅</span>';
  setTimeout(() => {
    copyBtn.innerHTML = '<span>📋</span>';
  }, 1200);
});

// --- Share button for mobile ---
const shareBtn = document.getElementById('share-btn');
function showShareBtnIfMobile() {
  if (window.matchMedia('(max-width: 600px)').matches && navigator.share) {
    shareBtn.classList.add('visible');
    shareBtn.classList.remove('hidden');
  } else {
    shareBtn.classList.remove('visible');
    shareBtn.classList.add('hidden');
  }
}
shareBtn.addEventListener('click', function() {
  navigator.share({
    title: document.title,
    url: window.location.href
  });
});
showShareBtnIfMobile();
window.addEventListener('resize', showShareBtnIfMobile);
