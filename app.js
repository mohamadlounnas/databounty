/**
 * DATABOUNTY Leaderboard Application
 * 
 * This script handles:
 * 1. Sorting and displaying team data
 * 2. Tab switching between different leaderboards (final, AI, security)
 * 3. Highlighting top performers
 * 4. Particle animations and cyber effects
 * 5. Matrix code rain visualization
 * 6. Terminal-style typing effects
 */

// DOM elements
const segmentButtons = document.querySelectorAll('.segment-btn');
const teamListContainer = document.getElementById('team-list');
const topTeams = document.querySelectorAll('.top-team');
let teamDetailDialog;
let dialogCloseBtn;
let dialogConfirmBtn;
let dialogMinimizeBtn;
let dialogMaximizeBtn;
let toggleNamesBtn;

// Current active tab/leaderboard
let activeTab = 'final';
let namesHidden = false;

/**
 * Initialize Matrix code rain animation
 */
function initMatrixCodeRain() {
    const matrixContainer = document.getElementById('matrix-container');
    const width = window.innerWidth;
    const numStreams = Math.floor(width / 30); // Approximately one stream every 30px

    // Characters for the matrix effect - mix of binary, hexadecimal, and Japanese-like characters
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン♯☢☣0123456789ABCDEF'.split('');

    // Create data streams
    for (let i = 0; i < numStreams; i++) {
        const stream = document.createElement('div');
        stream.className = 'data-stream';
        stream.style.left = `${Math.random() * 100}%`;

        // Random content
        let content = '';
        const length = 20 + Math.floor(Math.random() * 30);
        for (let j = 0; j < length; j++) {
            content += characters[Math.floor(Math.random() * characters.length)];
        }
        stream.textContent = content;

        // Random speed and delay
        const duration = 20 + Math.random() * 40;
        stream.style.animationDuration = `${duration}s`;
        stream.style.animationDelay = `${Math.random() * 10}s`;

        matrixContainer.appendChild(stream);
    }
}

/**
 * Initialize the page scroll indicator
 */
function initPageIndicator() {
    const indicator = document.getElementById('page-indicator');
    
    const updateScrollIndicator = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollPercentage = (scrollPosition / docHeight) * 100;
        indicator.style.width = scrollPercentage + '%';
    };
    
    window.addEventListener('scroll', updateScrollIndicator);
    updateScrollIndicator();
}

/**
 * Initialize particle.js animation for cybersecurity/AI background effect
 */
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ["#0c8eff", "#00fff2", "#9d00ff"]
                },
                shape: {
                    type: ["circle", "triangle", "polygon"],
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 6
                    }
                },
                opacity: {
                    value: 0.2,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.5,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00fff2",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }
}

/**
 * Add cyber-themed typing animation to elements
 * @param {HTMLElement} element - Element to apply typing animation to
 * @param {string} text - Text to type
 * @param {number} speed - Typing speed in milliseconds
 */
function typeText(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    const typing = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
            setTimeout(() => {
                element.classList.add('typing-complete');
            }, 500);
        }
    }, speed);
}

/**
 * Adds a glitch effect to an element briefly
 * @param {HTMLElement} element - Element to apply glitch effect to
 */
function glitchEffect(element) {
    element.classList.add('glitch');
    setTimeout(() => {
        element.classList.remove('glitch');
    }, 500);
}

/**
 * Play a cyber "power up" sound
 */
function playPowerUpSound() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = 'sine';
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    gainNode.gain.value = 0.1;
    oscillator.frequency.setValueAtTime(300, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
    oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.2);
    
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.2);
}

/**
 * Play a data transmission sound
 */
function playDataTransmissionSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.type = 'square';
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        gainNode.gain.value = 0.03; // Very quiet
        
        // Random frequency shifts to simulate data transmission
        for (let i = 0; i < 8; i++) {
            const time = ctx.currentTime + (i * 0.05);
            oscillator.frequency.setValueAtTime(
                800 + Math.random() * 600, 
                time
            );
            gainNode.gain.setValueAtTime(
                0.02 + (Math.random() * 0.02), 
                time
            );
        }
        
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.4);
    } catch (e) {
        // Silent catch - browsers may block autoplay/audio
        console.log("Audio context error:", e);
    }
}

/**
 * Sorts teams based on the specified score type
 * @param {string} scoreType - Type of score to sort by ('final', 'ai', or 'security')
 * @returns {Array} Sorted array of team objects
 */
function sortTeams(scoreType) {
    // Clone the array to avoid mutating the original data
    const sortedTeams = [...teamsData];
    
    // Map score types to object properties
    const scoreMap = {
        'final': 'finalScore',
        'ai': 'aiScore',
        'security': 'securityScore'
    };
    
    // Sort teams by the specified score in descending order
    return sortedTeams.sort((a, b) => b[scoreMap[scoreType]] - a[scoreMap[scoreType]]);
}

/**
 * Populates the top teams podium with the top 3 teams
 * @param {Array} teams - Sorted array of team objects
 */
function populateTopTeams(teams) {
    // Score property to display based on active tab
    const scoreProperty = 
        activeTab === 'final' ? 'finalScore' : 
        activeTab === 'ai' ? 'aiScore' : 'securityScore';
    
    // Select top 3 teams
    const topThree = teams.slice(0, 3);
    
    // Update first place (middle position)
    const firstPlaceEl = topTeams[1];
    const firstPlaceNameEl = firstPlaceEl.querySelector('.team-name');
    firstPlaceNameEl.textContent = topThree[0].name;
    firstPlaceNameEl.setAttribute('data-text', topThree[0].name);
    
    const firstPlaceScoreEl = firstPlaceEl.querySelector('.team-score');
    firstPlaceScoreEl.textContent = topThree[0][scoreProperty].toFixed(1);
    firstPlaceScoreEl.setAttribute('data-score', topThree[0][scoreProperty].toFixed(1));
    
    // Add binary ID representation for cyberpunk effect
    const firstPlaceBinaryID = generateBinaryDisplay(topThree[0].id);
    firstPlaceEl.setAttribute('data-binary-id', firstPlaceBinaryID);
    
    // Update second place (left position)
    const secondPlaceEl = topTeams[0];
    const secondPlaceNameEl = secondPlaceEl.querySelector('.team-name');
    secondPlaceNameEl.textContent = topThree[1].name;
    secondPlaceNameEl.setAttribute('data-text', topThree[1].name);
    
    const secondPlaceScoreEl = secondPlaceEl.querySelector('.team-score');
    secondPlaceScoreEl.textContent = topThree[1][scoreProperty].toFixed(1);
    secondPlaceScoreEl.setAttribute('data-score', topThree[1][scoreProperty].toFixed(1));
    
    // Add binary ID representation for cyberpunk effect
    const secondPlaceBinaryID = generateBinaryDisplay(topThree[1].id);
    secondPlaceEl.setAttribute('data-binary-id', secondPlaceBinaryID);
    
    // Update third place (right position)
    const thirdPlaceEl = topTeams[2];
    const thirdPlaceNameEl = thirdPlaceEl.querySelector('.team-name');
    thirdPlaceNameEl.textContent = topThree[2].name;
    thirdPlaceNameEl.setAttribute('data-text', topThree[2].name);
    
    const thirdPlaceScoreEl = thirdPlaceEl.querySelector('.team-score');
    thirdPlaceScoreEl.textContent = topThree[2][scoreProperty].toFixed(1);
    thirdPlaceScoreEl.setAttribute('data-score', topThree[2][scoreProperty].toFixed(1));
    
    // Add binary ID representation for cyberpunk effect
    const thirdPlaceBinaryID = generateBinaryDisplay(topThree[2].id);
    thirdPlaceEl.setAttribute('data-binary-id', thirdPlaceBinaryID);
    
    // Apply animations with sequence timing for dramatic effect
    // First reset all animations by removing reveal class
    topTeams.forEach(team => {
        team.classList.remove('reveal');
    });
    
    // Apply staggered reveal animations
    setTimeout(() => {
        secondPlaceEl.classList.add('reveal');
        playDataTransmissionSound();
    }, 200);
    
    setTimeout(() => {
        firstPlaceEl.classList.add('reveal');
        playPowerUpSound();
    }, 400);
    
    setTimeout(() => {
        thirdPlaceEl.classList.add('reveal');
        playDataTransmissionSound();
    }, 600);
}

/**
 * Generate binary representation from ID for cyberpunk aesthetics
 * @param {string} id - Team ID 
 * @returns {string} Binary representation
 */
function generateBinaryDisplay(id) {
    const teamIdStr = String(id);
    // Use the first 8 characters of ID for binary representation
    const binaryDisplay = teamIdStr.slice(0, 8).split('').map(char => {
        // Convert to binary if it's a number or letter
        if (/[0-9a-zA-Z]/.test(char)) {
            const code = char.charCodeAt(0);
            return code.toString(2).padStart(8, '0');
        }
        return '00000000'; // Default for special characters
    }).join('').slice(0, 16);
    
    return binaryDisplay;
}

/**
 * Creates HTML for a team list item
 * @param {Object} team - Team data object
 * @param {number} rank - Team's current rank
 * @returns {string} HTML string for the team item
 */
function createTeamListItem(team, rank) {
    // Highlight the score that corresponds to the active tab
    const aiScoreClass = activeTab === 'ai' ? 'ai-score' : '';
    const securityScoreClass = activeTab === 'security' ? 'security-score' : '';
    const finalScoreClass = activeTab === 'final' ? 'total-score' : 'total-score';
    
    // Create binary and hex representations for cyberpunk aesthetics
    // Handle both numeric and string IDs by ensuring it's treated as a string
    const teamIdStr = String(team.id);
    // Use the first 8 characters of ID for binary representation
    const binaryDisplay = teamIdStr.slice(0, 8).split('').map(char => {
        // Convert to binary if it's a number or letter
        if (/[0-9a-zA-Z]/.test(char)) {
            const code = char.charCodeAt(0);
            return code.toString(2).padStart(4, '0');
        }
        return '0000'; // Default for special characters
    }).join('').slice(0, 8);
    
    // Use first 4 chars of ID for hex display or generate from string
    const hexDisplay = teamIdStr.slice(0, 4).padStart(4, '0').toUpperCase();
    
    return `
        <div class="team-item" data-team-id="${team.id}">
            <div class="team-rank">${rank}</div>
            <div class="team-info">
                <div class="team-title">
                    ${team.name}
                    <span class="binary-id">${binaryDisplay}</span>
                </div>
                <div class="score-details">
                    <div class="score-detail ${aiScoreClass}">
                        <i class="fas fa-brain"></i> AI: ${team.aiScore.toFixed(1)}
                    </div>
                    <div class="score-detail ${securityScoreClass}">
                        <i class="fas fa-shield-alt"></i> SEC: ${team.securityScore.toFixed(1)}
                    </div>
                </div>
            </div>
            <div class="${finalScoreClass} mono">
                ${activeTab === 'final' ? '<i class="fas fa-chart-line"></i>' : ''}
                ${team[activeTab === 'final' ? 'finalScore' : activeTab === 'ai' ? 'aiScore' : 'securityScore'].toFixed(1)}
            </div>
        </div>
    `;
}

/**
 * Shows team detail dialog for the selected team
 * @param {Object} team - Team data object 
 * @param {number} rank - Team's current rank
 */
function showTeamDetailDialog(team, rank) {
    // Get DOM elements
    const teamNameElement = document.getElementById('dialogTeamName');
    const teamIdElement = document.getElementById('dialogTeamId');
    const teamAiScoreElement = document.getElementById('dialogAiScore');
    const teamSecurityScoreElement = document.getElementById('dialogSecurityScore');
    const teamTotalScoreElement = document.getElementById('dialogTotalScore');
    const teamRankElement = document.getElementById('dialogTeamRank');
    const performanceRatingElement = document.getElementById('performanceRating');
    const performanceAnalysisElement = document.getElementById('performanceAnalysis');
    const aiScoreBar = document.getElementById('aiScoreBar');
    const securityScoreBar = document.getElementById('securityScoreBar');
    const totalScoreBar = document.getElementById('totalScoreBar');
    const dialogWindow = document.querySelector('.cyber-dialog-window');
    
    // Set team data
    teamNameElement.textContent = team.name;
    teamIdElement.textContent = `ID: ${team.id}`;
    teamAiScoreElement.textContent = team.aiScore.toFixed(1);
    teamSecurityScoreElement.textContent = team.securityScore.toFixed(1);
    teamTotalScoreElement.textContent = team.finalScore.toFixed(1);
    teamRankElement.textContent = `#${rank}`;
    
    // Reset progress bars
    aiScoreBar.style.width = '0%';
    securityScoreBar.style.width = '0%';
    totalScoreBar.style.width = '0%';
    
    // Determine performance rating based on score
    let rating = '';
    let ratingBg = '';
    
    if (team.finalScore >= 40) {
        rating = 'S-TIER';
        ratingBg = 'linear-gradient(90deg, #ff8a00, #ff0080)';
    } else if (team.finalScore >= 30) {
        rating = 'A-TIER';
        ratingBg = 'linear-gradient(90deg, #ffca00, #ff6b00)';
    } else if (team.finalScore >= 20) {
        rating = 'B-TIER';
        ratingBg = 'linear-gradient(90deg, #00ffa3, #00c8ff)';
    } else if (team.finalScore >= 10) {
        rating = 'C-TIER';
        ratingBg = 'linear-gradient(90deg, #0099ff, #0033ff)';
    } else if (team.finalScore >= 5) {
        rating = 'D-TIER';
        ratingBg = 'linear-gradient(90deg, #8c8c8c, #4a4a4a)';
    } else {
        rating = 'E-TIER';
        ratingBg = 'linear-gradient(90deg, #666, #333)';
    }
    
    performanceRatingElement.textContent = rating;
    performanceRatingElement.style.background = ratingBg;
    
    // Generate and set performance analysis
    performanceAnalysisElement.innerHTML = generateTeamAnalysis(team, rank);
    
    // Show dialog
    teamDetailDialog.classList.add('open');
    
    // Play sound effect
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-game-notification-wave-alarm-987.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    // Add scan line effect to dialog window
    addScanLine(dialogWindow);
    
    // Animate score bars after a delay
    setTimeout(() => {
        const maxScore = 100; // Maximum possible score is 100
        const aiScorePercent = (team.aiScore / maxScore) * 100;
        const securityScorePercent = (team.securityScore / maxScore) * 100;
        const totalScorePercent = (team.finalScore / maxScore) * 100;
        
        aiScoreBar.style.transition = 'width 1s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
        securityScoreBar.style.transition = 'width 1s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
        totalScoreBar.style.transition = 'width 1s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
        
        aiScoreBar.style.width = `${aiScorePercent}%`;
        
        setTimeout(() => {
            securityScoreBar.style.width = `${securityScorePercent}%`;
            
            setTimeout(() => {
                totalScoreBar.style.width = `${totalScorePercent}%`;
                // Add scan line after total score bar completes
                addScanLine(document.querySelector('.cyber-dialog-content'));
            }, 200);
        }, 200);
    }, 600);
}

/**
 * Generates a detailed analysis of team performance
 * @param {Object} team - Team data object
 * @param {number} rank - Team's current rank
 * @returns {string} HTML formatted analysis
 */
function generateTeamAnalysis(team, rank) {
    const aiScore = team.aiScore;
    const securityScore = team.securityScore;
    const totalScore = team.finalScore;
    
    let analysis = '';
    
    // Add intro sentence based on rank
    if (rank <= 3) {
        analysis += `Team <span>${team.name}</span> is a top performer, currently ranked <span>#${rank}</span> overall. `;
    } else if (rank <= 10) {
        analysis += `Team <span>${team.name}</span> is showing strong potential, currently ranked <span>#${rank}</span>. `;
    } else {
        analysis += `Team <span>${team.name}</span> is currently ranked <span>#${rank}</span> and has room for improvement. `;
    }
    
    // Analyze AI score
    if (aiScore >= 80) {
        analysis += `The team demonstrates exceptional AI proficiency with a score of <span>${aiScore.toFixed(1)}</span>. `;
    } else if (aiScore >= 50) {
        analysis += `Their AI capabilities are solid with a score of <span>${aiScore.toFixed(1)}</span>. `;
    } else if (aiScore >= 20) {
        analysis += `AI performance is developing with a score of <span>${aiScore.toFixed(1)}</span>. `;
    } else {
        analysis += `AI score of <span>${aiScore.toFixed(1)}</span> indicates this is an area for growth. `;
    }
    
    // Analyze security score
    if (securityScore >= 35) {
        analysis += `Security expertise is outstanding with a score of <span>${securityScore.toFixed(1)}</span>. `;
    } else if (securityScore >= 20) {
        analysis += `Security capabilities are good with a score of <span>${securityScore.toFixed(1)}</span>. `;
    } else if (securityScore >= 10) {
        analysis += `Security performance is moderate with a score of <span>${securityScore.toFixed(1)}</span>. `;
    } else {
        analysis += `Security score of <span>${securityScore.toFixed(1)}</span> suggests need for improvement. `;
    }
    
    // Add conclusion and recommendation
    if (aiScore > securityScore * 2) {
        analysis += `The team shows significantly stronger AI skills compared to security. Focusing on security challenges could improve overall ranking.`;
    } else if (securityScore > aiScore * 2) {
        analysis += `The team demonstrates much stronger security capabilities than AI. Improving AI performance would enhance overall standing.`;
    } else {
        analysis += `The team has a balanced skill set across both domains. Continued improvement in both areas will help maintain competitive standing.`;
    }
    
    return analysis;
}

/**
 * Closes the team detail dialog with animation
 */
function closeTeamDetailDialog() {
    // Add glitch effect before closing
    const dialogWindow = document.querySelector('.cyber-dialog-window');
    dialogWindow.classList.add('glitch-effect');
    
    // Play close sound
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-tech-click-1140.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    // Add final scan line before closing
    addScanLine(dialogWindow);
    
    // Wait for glitch animation to complete before closing
    setTimeout(() => {
        teamDetailDialog.classList.remove('open');
        dialogWindow.classList.remove('glitch-effect');
    }, 500);
}

/**
 * Simulates minimizing the dialog
 */
function minimizeTeamDetailDialog() {
    const dialogWindow = document.querySelector('.cyber-dialog-window');
    dialogWindow.classList.add('glitch-effect');
    
    // Play minimize sound
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-futuristic-click-1118.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    // Simulate minimize animation
    dialogWindow.style.transform = 'scale(0.01) translateY(100vh)';
    dialogWindow.style.opacity = '0';
    
    setTimeout(() => {
        dialogWindow.style.transform = '';
        dialogWindow.style.opacity = '';
        dialogWindow.classList.remove('glitch-effect');
        teamDetailDialog.classList.remove('open');
    }, 500);
}

/**
 * Simulates maximizing the dialog with a glitch effect
 */
function maximizeTeamDetailDialog() {
    const dialogWindow = document.querySelector('.cyber-dialog-window');
    
    // Play maximize sound
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-futuristic-sci-fi-computer-notification-3125.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    // Add glitch effect
    dialogWindow.classList.add('glitch-effect');
    
    // Add scan line
    addScanLine(dialogWindow);
    
    // Simulate maximize by slightly increasing size then returning to normal
    dialogWindow.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
        dialogWindow.style.transform = '';
        dialogWindow.classList.remove('glitch-effect');
        
        // Add another scan line after maximizing
        setTimeout(() => {
            addScanLine(dialogWindow);
        }, 300);
    }, 500);
}

/**
 * Add scan line for cyber effect
 * @param {Element} element - Element to add scan line to
 */
function addScanLine(element) {
    const scanLine = document.createElement('div');
    scanLine.className = 'scan-line';
    element.appendChild(scanLine);
    
    // Remove the scan line after the animation completes
    setTimeout(() => {
        if (scanLine && scanLine.parentNode) {
            scanLine.parentNode.removeChild(scanLine);
        }
    }, 2000); // Match the animation duration (2s)
}

/**
 * Populates the team list with all teams (excluding top 3)
 * @param {Array} teams - Sorted array of team objects
 */
function populateTeamList(teams) {
    // Clear existing content
    teamListContainer.innerHTML = '';
    
    // Skip the top 3 teams (already shown in the podium)
    const remainingTeams = teams.slice(3);
    
    // Create HTML for each team and append to container
    remainingTeams.forEach((team, index) => {
        const html = createTeamListItem(team, index + 4); // +4 because we're starting from rank 4
        teamListContainer.innerHTML += html;
    });
    
    // Add click event listeners to team items for additional interaction
    document.querySelectorAll('.team-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            // Play "data" sound effect
            playDataTransmissionSound();
            
            // Toggle highlight effect
            item.classList.toggle('active');
            
            // Trigger glitch effect
            glitchEffect(item);
            
            // Show team detail dialog
            const teamId = item.dataset.teamId;
            const team = teamsData.find(t => String(t.id) === teamId);
            if (team) {
                showTeamDetailDialog(team, index + 4); // +4 for rank
            }
        });
    });
}

/**
 * Updates the leaderboard based on the active tab
 */
function updateLeaderboard() {
    // Sort teams by the active score type
    const sortedTeams = sortTeams(activeTab);
    
    // Update leaderboard components
    populateTopTeams(sortedTeams);
    populateTeamList(sortedTeams);
    
    // Add appropriate active class for the current tab's styling
    document.body.className = `matrix-animation tab-${activeTab}`;
    
    // Apply "data processing" visual effect
    simulateDataProcessing();
}

/**
 * Simulate data processing with visual effects
 */
function simulateDataProcessing() {
    const header = document.querySelector('header');
    header.classList.add('processing');
    
    setTimeout(() => {
        header.classList.remove('processing');
    }, 800);
}

/**
 * Switches between different leaderboard tabs
 * @param {string} tab - Tab to switch to ('final', 'ai', or 'security')
 */
function switchTab(tab) {
    // Only process if this is a different tab
    if (tab !== activeTab) {
        // Reset animations on top teams
        topTeams.forEach(team => {
            team.classList.remove('reveal');
        });
        
        // Update active tab
        activeTab = tab;
        
        // Update UI to reflect the active tab
        segmentButtons.forEach(button => {
            if (button.dataset.tab === tab) {
                button.classList.add('active');
                glitchEffect(button);
            } else {
                button.classList.remove('active');
            }
        });
        
        // Play switching sound
        playPowerUpSound();
        
        // Update leaderboard data
        updateLeaderboard();
    }
}

/**
 * Create a matrix-style console message
 */
function matrixConsoleGreeting() {
    const styles = [
        'color: #00fff2', 
        'font-weight: bold', 
        'font-size: 14px',
        'text-shadow: 0 0 5px #00fff2',
        'font-family: "JetBrains Mono", monospace'
    ].join(';');
    
    console.log('%c> DATABOUNTY::CYBERSECURITY_PROTOCOL_INITIALIZED', styles);
    console.log('%c> ACCESS GRANTED TO COMPETITION LEADERBOARD', styles);
    console.log('%c> AUTHENTICATION VERIFIED. DISPLAYING TEAM RANKINGS...', styles);
}

/**
 * Toggles visibility of team names
 */
function toggleTeamNames() {
    namesHidden = !namesHidden;
    document.body.classList.toggle('names-hidden', namesHidden);
    toggleNamesBtn.classList.toggle('active', namesHidden);
    
    // Update button icon and text
    const icon = toggleNamesBtn.querySelector('i');
    icon.className = namesHidden ? 'fas fa-eye' : 'fas fa-eye-slash';
    toggleNamesBtn.innerHTML = `${icon.outerHTML} ${namesHidden ? 'Show Names' : 'Hide Names'}`;
    
    // Play effect
    playDataTransmissionSound();
    
    // Add glitch effect to all team names
    document.querySelectorAll('.team-name, .team-title').forEach(el => {
        glitchEffect(el);
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM elements that need to be loaded first
    teamDetailDialog = document.getElementById('team-detail-dialog');
    dialogCloseBtn = teamDetailDialog.querySelector('.cyber-dialog-btn.close');
    dialogConfirmBtn = teamDetailDialog.querySelector('.cyber-button.confirm');
    dialogMinimizeBtn = teamDetailDialog.querySelector('.cyber-dialog-btn.minimize');
    dialogMaximizeBtn = teamDetailDialog.querySelector('.cyber-dialog-btn.maximize');
    toggleNamesBtn = document.getElementById('toggleNames');

    // Add event listeners to dialog buttons
    dialogCloseBtn.addEventListener('click', closeTeamDetailDialog);
    dialogConfirmBtn.addEventListener('click', closeTeamDetailDialog);
    dialogMinimizeBtn.addEventListener('click', minimizeTeamDetailDialog);
    dialogMaximizeBtn.addEventListener('click', maximizeTeamDetailDialog);
    toggleNamesBtn.addEventListener('click', toggleTeamNames);

    // Initialize matrix code rain
    initMatrixCodeRain();
    
    // Initialize page scroll indicator
    initPageIndicator();
    
    // Initialize particle background
    initParticles();
    
    // Initialize the leaderboard with default tab (final score)
    updateLeaderboard();
    
    // Matrix-style console message
    matrixConsoleGreeting();
    
    // Add terminal-style typing effect to title
    setTimeout(() => {
        const subtitle = document.querySelector('.subtitle');
        typeText(subtitle, subtitle.textContent, 40);
    }, 800);
    
    // Simulate initial system boot sound
    setTimeout(() => {
        playPowerUpSound();
    }, 300);
    
    // Animate header on page load
    document.querySelector('header').style.animation = 'fadeIn 1s ease forwards';
    
    // Add hover interaction to the top teams
    topTeams.forEach(team => {
        team.addEventListener('mouseenter', () => {
            team.style.transform = 'translateY(-10px) scale(1.05)';
            playDataTransmissionSound();
        });
        
        team.addEventListener('mouseleave', () => {
            team.style.transform = '';
        });
    });
    
    // Add event listeners to top teams for dialog display
    topTeams.forEach((teamEl, index) => {
        teamEl.addEventListener('click', () => {
            // Get current sorted teams
            const sortedTeams = sortTeams(activeTab);
            const team = sortedTeams[index];
            
            if (team) {
                showTeamDetailDialog(team, index + 1); // +1 for rank (1-indexed)
                playPowerUpSound();
            }
        });
    });
});

// Add event listeners to tab buttons
segmentButtons.forEach(button => {
    button.addEventListener('click', () => {
        switchTab(button.dataset.tab);
    });
}); 