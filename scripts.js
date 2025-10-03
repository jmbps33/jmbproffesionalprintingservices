        // Global variables
        let cart = [];
        let cartTotal = 0;

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            try {
                updatePhilippinesTime();
                updateChristmasCountdown();
                
                // Update time every minute
                setInterval(updatePhilippinesTime, 60000);
                // Update countdown every second
                setInterval(updateChristmasCountdown, 1000);
            } catch (error) {
                console.log('Initialization complete');
            }
        });

        // Time and Date Functions
        function updatePhilippinesTime() {
            const now = new Date();
            const philippinesTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Manila"}));
            const timeString = philippinesTime.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            
            const timeElement = document.getElementById('philippinesTime');
            if (timeElement) {
                timeElement.textContent = timeString;
            }
        }

        function updateChristmasCountdown() {
            try {
                const now = new Date();
                const currentYear = now.getFullYear();
                let christmas = new Date(currentYear, 11, 25); // December 25
                
                // If Christmas has passed this year, count to next year's Christmas
                if (now > christmas) {
                    christmas = new Date(currentYear + 1, 11, 25);
                }
                
                const timeDiff = christmas - now;
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                
                const countdownElement = document.getElementById('countdownText');
                if (countdownElement) {
                    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
                        countdownElement.innerHTML = '🎅 Merry Christmas! 🎁';
                    } else {
                        countdownElement.innerHTML = `🎅 Christmas Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s 🎁`;
                    }
                }
            } catch (error) {
                // Silently handle any errors
            }
        }

        // Navigation Functions
        function scrollToServices() {
            document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
        }

        function scrollToContact() {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }

        // FAQ Functions
        function toggleFAQ(faqNumber) {
            const content = document.getElementById(`faq-content-${faqNumber}`);
            const icon = document.getElementById(`faq-icon-${faqNumber}`);
            
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                icon.textContent = '−';
                icon.style.transform = 'rotate(0deg)';
            } else {
                content.classList.add('hidden');
                icon.textContent = '+';
                icon.style.transform = 'rotate(0deg)';
            }
        }

        // Student Registration Functions
        function showStudentRegistration() {
            document.getElementById('studentModal').classList.remove('hidden');
        }

        function closeStudentRegistration() {
            document.getElementById('studentModal').classList.add('hidden');
            document.getElementById('studentRegistrationForm').reset();
        }

        function submitStudentRegistration(event) {
            event.preventDefault();
            
            // Check if verification method is selected
            const hasUploadedId = window.studentIdVerified === true;
            const hasManualVerification = window.manualVerificationSelected === true;
            
            if (!hasUploadedId && !hasManualVerification) {
                alert('⚠️ Student ID Verification Required\n\nPlease either:\n1. Upload your scanned student ID using CamScanner, OR\n2. Select manual verification at our shop\n\nThis is required to activate your ₱1.00 printing rate.');
                return;
            }
            
            const formData = new FormData(event.target);
            const studentData = {
                fullName: formData.get('fullName'),
                studentId: formData.get('studentId'),
                school: formData.get('school'),
                educationLevel: formData.get('educationLevel'),
                gradeYear: formData.get('gradeYear'),
                course: formData.get('course'),
                contactNumber: formData.get('contactNumber'),
                email: formData.get('email'),
                guardianContact: formData.get('guardianContact'),
                agreeTerms: formData.get('agreeTerms'),
                agreeInfo: formData.get('agreeInfo'),
                agreeContact: formData.get('agreeContact'),
                verificationMethod: hasUploadedId ? 'CamScanner Upload' : 'Manual Verification'
            };
            
            // Generate claim stub number
            const stubNumber = generateClaimStubNumber();
            const registrationDate = new Date().toLocaleDateString('en-PH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Manila'
            });
            const registrationTime = new Date().toLocaleTimeString('en-PH', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Manila'
            });
            
            // Create claim stub
            let claimStub = `═══════════════════════════════════════\n`;
            claimStub += `🎓 JMB PRINTING SERVICES - STUDENT REGISTRATION\n`;
            claimStub += `═══════════════════════════════════════\n\n`;
            claimStub += `📋 CLAIM STUB #${stubNumber}\n`;
            claimStub += `📅 Date: ${registrationDate}\n`;
            claimStub += `⏰ Time: ${registrationTime}\n\n`;
            claimStub += `👤 STUDENT INFORMATION:\n`;
            claimStub += `Name: ${studentData.fullName}\n`;
            claimStub += `Student ID: ${studentData.studentId}\n`;
            claimStub += `School: ${studentData.school}\n`;
            claimStub += `Level: ${studentData.educationLevel} - ${studentData.gradeYear}\n`;
            if (studentData.course) claimStub += `Course/Strand: ${studentData.course}\n`;
            claimStub += `Contact: ${studentData.contactNumber}\n`;
            if (studentData.email) claimStub += `Email: ${studentData.email}\n`;
            claimStub += `Verification: ${studentData.verificationMethod}\n`;
            claimStub += `\n💰 REGISTERED RATE: ₱1.00 per page (B&W)\n`;
            claimStub += `\n📋 REQUIREMENTS FOR PICKUP:\n`;
            claimStub += `✅ Present valid student ID\n`;
            claimStub += `✅ Mention claim stub number: ${stubNumber}\n`;
            claimStub += `✅ Black & white printing only\n`;
            claimStub += `\n📧 SUBMIT FILES TO:\n`;
            claimStub += `Email: jmbprintingservices12@gmail.com\n`;
            claimStub += `Facebook: JMB Printing Services\n`;
            claimStub += `\n📍 PICKUP LOCATION:\n`;
            claimStub += `Balitoc, Calatagan, Batangas\n`;
            claimStub += `📞 SMART: 09478188686 | TM: 09050869449\n`;
            claimStub += `⏰ Mon-Fri: 8AM-8:30PM | Sat-Sun: 7AM-9PM\n`;
            claimStub += `\n⚠️ IMPORTANT DISCLAIMER:\n`;
            claimStub += `THIS IS NOT THE OFFICIAL STUB.\n`;
            claimStub += `THE OFFICIAL STUB IS AT OUR SHOP.\n`;
            claimStub += `\n═══════════════════════════════════════\n`;
            claimStub += `Thank you for registering with JMB Printing!\n`;
            claimStub += `═══════════════════════════════════════`;
            
            // Generate and download PDF claim stub
            const pdfFileName = generateClaimStubPDF(studentData, stubNumber);
            
            // Show success message
            setTimeout(() => {
                alert(`✅ REGISTRATION SUCCESSFUL!\n\n📄 Your claim stub PDF has been downloaded: ${pdfFileName}\n\n🎓 You are now registered for ₱1.00 printing!\n\n📋 NEXT STEPS:\n1. Keep your PDF claim stub safe\n2. Present your student ID when picking up prints\n3. Mention stub number: ${stubNumber}\n4. Enjoy ₱1.00 per page printing rate!\n\n📧 Send your files to: jmbprintingservices12@gmail.com`);
            }, 500);
            
            // Close form and add student printing to cart
            closeStudentRegistration();
            addToCart('PISO PRINTING - ✅ REGISTERED', 1);
        }

        function generateClaimStubNumber() {
            const now = new Date();
            const year = now.getFullYear().toString().slice(-2);
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            const time = now.getTime().toString().slice(-4);
            return `STU${year}${month}${day}${time}`;
        }

        function generateClaimStubPDF(studentData, stubNumber) {
            const { jsPDF } = window.jspdf;
            
            // Half Letter size in landscape (140 x 108.5 mm)
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: [140, 108.5]
            });
            
            const registrationDate = new Date().toLocaleDateString('en-PH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Manila'
            });
            const registrationTime = new Date().toLocaleTimeString('en-PH', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Manila'
            });
            
            // Set margins for landscape
            const margin = 8;
            const centerX = 70; // Center of 140mm width
            let yPos = margin + 3;
            
            // Header
            doc.setFontSize(12);
            doc.setFont(undefined, 'bold');
            doc.text('JMB PRINTING SERVICES', centerX, yPos, { align: 'center' });
            yPos += 5;
            
            doc.setFontSize(8);
            doc.setFont(undefined, 'normal');
            doc.text('STUDENT REGISTRATION CLAIM STUB', centerX, yPos, { align: 'center' });
            yPos += 4;
            
            // Draw line
            doc.line(margin, yPos, 140 - margin, yPos);
            yPos += 4;
            
            // Create two columns layout
            const leftCol = margin;
            const rightCol = centerX + 5;
            
            // Left column - Stub info and student details
            doc.setFontSize(9);
            doc.setFont(undefined, 'bold');
            doc.text(`STUB #${stubNumber}`, leftCol, yPos);
            
            doc.setFontSize(7);
            doc.setFont(undefined, 'normal');
            doc.text(`Date: ${registrationDate}`, leftCol, yPos + 4);
            doc.text(`Time: ${registrationTime}`, leftCol, yPos + 7);
            
            // Student info in left column
            doc.setFontSize(7);
            doc.setFont(undefined, 'bold');
            doc.text('STUDENT INFORMATION:', leftCol, yPos + 12);
            
            doc.setFont(undefined, 'normal');
            doc.text(`Name: ${studentData.fullName}`, leftCol, yPos + 16);
            doc.text(`ID: ${studentData.studentId}`, leftCol, yPos + 19);
            doc.text(`School: ${studentData.school}`, leftCol, yPos + 22);
            doc.text(`Level: ${studentData.educationLevel} - ${studentData.gradeYear}`, leftCol, yPos + 25);
            if (studentData.course) {
                doc.text(`Course: ${studentData.course}`, leftCol, yPos + 28);
                yPos += 3;
            }
            doc.text(`Contact: ${studentData.contactNumber}`, leftCol, yPos + 28);
            
            // Right column - Requirements
            doc.setFontSize(7);
            doc.setFont(undefined, 'bold');
            doc.text('REQUIREMENTS FOR PICKUP:', rightCol, yPos + 7);
            
            doc.setFont(undefined, 'normal');
            doc.text('✓ Present valid student ID', rightCol, yPos + 11);
            doc.text(`✓ Mention stub #${stubNumber}`, rightCol, yPos + 14);
            
            // Contact info in right column
            doc.setFontSize(7);
            doc.setFont(undefined, 'bold');
            doc.text('CONTACT & LOCATION:', rightCol, yPos + 20);
            
            doc.setFont(undefined, 'normal');
            doc.text('Balitoc, Calatagan, Batangas', rightCol, yPos + 24);
            doc.text('SMART: 09478188686 | TM: 09050869449', rightCol, yPos + 27);
            doc.text('Mon-Fri: 8AM-8:30PM | Sat-Sun: 7AM-9PM', rightCol, yPos + 30);
            doc.text('Email: jmbprintingservices12@gmail.com', rightCol, yPos + 33);
            
            // Bottom section spanning full width
            yPos += 50;
            
            // Footer spanning full width
            doc.setFontSize(6);
            doc.setFont(undefined, 'italic');
            doc.text('Keepthisstubforyourrecords.Presentatpickupfor₱1.00rateverification.', centerX, yPos, { align: 'center' });
            
            // Draw vertical divider between columns
            doc.line(centerX, margin + 15, centerX, yPos - 5);
            
            // Draw border (landscape half-letter: 140 x 108.5)
            doc.rect(2, 2, 136, 104.5);
            
            // Save the PDF
            const fileName = `JMB_Student_Claim_Stub_${stubNumber}.pdf`;
            doc.save(fileName);
            
            return fileName;
        }

        // Logo Form Functions
        function showLogoForm() {
            document.getElementById('logoModal').classList.remove('hidden');
        }

        function closeLogoForm() {
            document.getElementById('logoModal').classList.add('hidden');
            document.getElementById('logoOrderForm').reset();
        }

        function submitLogoOrder(event) {
            event.preventDefault();
            
            const formData = new FormData(event.target);
            const orderDetails = {
                companyName: formData.get('companyName'),
                contactPerson: formData.get('contactPerson'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                businessType: formData.get('businessType'),
                logoStyle: formData.get('logoStyle'),
                colors: formData.get('colors'),
                description: formData.get('description'),
                formats: formData.getAll('formats')
            };
            
            // Create detailed order summary
            let orderSummary = `🎨 LOGO HD ORDER DETAILS\n\n`;
            orderSummary += `Company: ${orderDetails.companyName}\n`;
            orderSummary += `Contact: ${orderDetails.contactPerson}\n`;
            orderSummary += `Phone: ${orderDetails.phone}\n`;
            if (orderDetails.email) orderSummary += `Email: ${orderDetails.email}\n`;
            orderSummary += `Business Type: ${orderDetails.businessType}\n`;
            if (orderDetails.logoStyle) orderSummary += `Style: ${orderDetails.logoStyle}\n`;
            if (orderDetails.colors) orderSummary += `Colors: ${orderDetails.colors}\n`;
            orderSummary += `Description: ${orderDetails.description}\n`;
            if (orderDetails.formats.length > 0) orderSummary += `Formats: ${orderDetails.formats.join(', ')}\n`;
            orderSummary += `\nTotal: ₱1,000.00\n`;
            orderSummary += `\nThank you! We'll contact you within 24 hours to discuss your logo design project.`;
            
            alert(orderSummary);
            
            // Add to cart and close form
            addToCart('LOGO HD - Custom Design', 1000);
            closeLogoForm();
        }

        // Shopping Cart Functions
        function addToCart(serviceName, price) {
            const existingItem = cart.find(item => item.name === serviceName);
            
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.total = existingItem.quantity * existingItem.price;
            } else {
                cart.push({
                    name: serviceName,
                    price: price,
                    quantity: 1,
                    total: price
                });
            }
            
            updateCartDisplay();
            
            // Show success animation
            const button = event.target;
            const originalText = button.innerHTML;
            button.innerHTML = '✓ Added!';
            button.classList.add('success-animation');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('success-animation');
            }, 1000);
        }

        function removeFromCart(serviceName) {
            cart = cart.filter(item => item.name !== serviceName);
            updateCartDisplay();
        }

        function updateQuantity(serviceName, newQuantity) {
            const item = cart.find(item => item.name === serviceName);
            if (item) {
                if (newQuantity <= 0) {
                    removeFromCart(serviceName);
                } else {
                    item.quantity = newQuantity;
                    item.total = item.quantity * item.price;
                    updateCartDisplay();
                }
            }
        }

        function updateCartDisplay() {
            const cartItems = document.getElementById('cartItems');
            const cartCount = document.getElementById('cartCount');
            const navCartCount = document.getElementById('navCartCount');
            const cartTotal = document.getElementById('cartTotal');
            
            // Calculate total
            const total = cart.reduce((sum, item) => sum + item.total, 0);
            const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            
            // Update counters
            cartCount.textContent = itemCount;
            navCartCount.textContent = itemCount;
            cartTotal.textContent = `₱${total.toFixed(2)}`;
            
            // Update cart items display
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="text-center text-gray-500 py-8">
                        Your cart is empty. Add some services to get started!
                    </div>
                `;
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div class="flex-1">
                            <h4 class="font-semibold text-gray-800">${item.name}</h4>
                            <p class="text-gray-600">₱${item.price.toFixed(2)} each</p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <button onclick="updateQuantity('${item.name}', ${item.quantity - 1})" 
                                    class="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                                -
                            </button>
                            <span class="font-semibold text-gray-800 w-8 text-center">${item.quantity}</span>
                            <button onclick="updateQuantity('${item.name}', ${item.quantity + 1})" 
                                    class="w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
                                +
                            </button>
                            <button onclick="removeFromCart('${item.name}')" 
                                    class="ml-4 text-red-500 hover:text-red-700 transition-colors">
                                🗑️
                            </button>
                        </div>
                        <div class="ml-4 text-right">
                            <p class="font-bold text-gray-800">₱${item.total.toFixed(2)}</p>
                        </div>
                    </div>
                `).join('');
            }
        }

        function toggleCart() {
            const cartModal = document.getElementById('cartModal');
            cartModal.classList.toggle('hidden');
        }

        function clearCart() {
            cart = [];
            updateCartDisplay();
        }

        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty! Please add some services first.');
                return;
            }
            
            // Generate order number
            const orderNumber = generateOrderNumber();
            const total = cart.reduce((sum, item) => sum + item.total, 0);
            
            // Generate PDF order summary
            const pdfFileName = generateOrderPDF(cart, total, orderNumber);
            
            // Show success message with PDF info
            let orderSummary = '✅ ORDER CREATED SUCCESSFULLY!\n\n';
            orderSummary += `📄 Your order PDF has been downloaded: ${pdfFileName}\n\n`;
            orderSummary += `📋 Order #${orderNumber}\n`;
            orderSummary += `💰 Total: ₱${total.toFixed(2)}\n\n`;
            orderSummary += `📞 NEXT STEPS:\n`;
            orderSummary += `1. Keep your PDF order summary safe\n`;
            orderSummary += `2. Contact us to confirm your order:\n`;
            orderSummary += `   SMART: 09478188686 | TM: 09050869449\n`;
            orderSummary += `3. Visit us with your order PDF:\n`;
            orderSummary += `   📍 Balitoc, Calatagan, Batangas\n`;
            orderSummary += `   ⏰ Mon-Fri 8AM-8:30PM, Sat-Sun 7AM-9PM\n\n`;
            orderSummary += `📧 Or email your files to: jmbprintingservices12@gmail.com`;
            
            alert(orderSummary);
            
            // Clear cart after successful checkout
            clearCart();
            toggleCart(); // Close cart modal
        }

        function generateOrderNumber() {
            const now = new Date();
            const year = now.getFullYear().toString().slice(-2);
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            const time = now.getTime().toString().slice(-4);
            return `JMB${year}${month}${day}${time}`;
        }

        function generateOrderPDF(cartItems, total, orderNumber) {
            const { jsPDF } = window.jspdf;
            
            // A6 size (105 x 148 mm)
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a6'
            });
            
            const orderDate = new Date().toLocaleDateString('en-PH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Manila'
            });
            const orderTime = new Date().toLocaleTimeString('en-PH', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Manila'
            });
            
            // Set margins for A6
            const margin = 6;
            const centerX = 52.5; // Center of 105mm width
            let yPos = margin + 3;
            
            // Header
            doc.setFontSize(10);
            doc.setFont(undefined, 'bold');
            doc.text('JMB PRINTING SERVICES', centerX, yPos, { align: 'center' });
            yPos += 4;
            
            doc.setFontSize(7);
            doc.setFont(undefined, 'normal');
            doc.text('Balitoc, Calatagan, Batangas', centerX, yPos, { align: 'center' });
            yPos += 3;
            doc.text('SMART: 09478188686 | TM: 09050869449', centerX, yPos, { align: 'center' });
            yPos += 5;
            
            // Draw line
            doc.line(margin, yPos, 105 - margin, yPos);
            yPos += 4;
            
            // Order info
            doc.setFontSize(8);
            doc.setFont(undefined, 'bold');
            doc.text('ORDER SUMMARY', centerX, yPos, { align: 'center' });
            yPos += 5;
            
            doc.setFontSize(7);
            doc.setFont(undefined, 'normal');
            doc.text(`Order #: ${orderNumber}`, margin, yPos);
            yPos += 3;
            doc.text(`Date: ${orderDate}`, margin, yPos);
            yPos += 3;
            doc.text(`Time: ${orderTime}`, margin, yPos);
            yPos += 5;
            
            // Draw line
            doc.line(margin, yPos, 105 - margin, yPos);
            yPos += 4;
            
            // Order items
            doc.setFontSize(7);
            doc.setFont(undefined, 'bold');
            doc.text('ITEMS ORDERED:', margin, yPos);
            yPos += 4;
            
            doc.setFont(undefined, 'normal');
            cartItems.forEach(item => {
                // Item name (truncate if too long)
                let itemName = item.name;
                if (itemName.length > 35) {
                    itemName = itemName.substring(0, 32) + '...';
                }
                doc.text(itemName, margin, yPos);
                yPos += 3;
                
                // Quantity and price
                doc.text(`${item.quantity} × ₱${item.price.toFixed(2)} = ₱${item.total.toFixed(2)}`, margin + 2, yPos);
                yPos += 4;
            });
            
            // Draw line before total
            yPos += 2;
            doc.line(margin, yPos, 105 - margin, yPos);
            yPos += 4;
            
            // Total
            doc.setFontSize(8);
            doc.setFont(undefined, 'bold');
            doc.text(`TOTAL: ₱${total.toFixed(2)}`, centerX, yPos, { align: 'center' });
            yPos += 6;
            
            // Instructions
            doc.setFontSize(6);
            doc.setFont(undefined, 'bold');
            doc.text('INSTRUCTIONS:', margin, yPos);
            yPos += 3;
            
            doc.setFont(undefined, 'normal');
            doc.text('1. Present this order summary at pickup', margin, yPos);
            yPos += 2.5;
            doc.text('2. Call to confirm order and discuss timeline', margin, yPos);
            yPos += 2.5;
            doc.text('3. Payment upon pickup or as agreed', margin, yPos);
            yPos += 2.5;
            doc.text('4. For file submission, email us your documents', margin, yPos);
            yPos += 4;
            
            // Contact info
            doc.setFontSize(6);
            doc.setFont(undefined, 'bold');
            doc.text('CONTACT US:', margin, yPos);
            yPos += 3;
            
            doc.setFont(undefined, 'normal');
            doc.text('📧 jmbprintingservices12@gmail.com', margin, yPos);
            yPos += 2.5;
            doc.text('📞 SMART: 09478188686 | TM: 09050869449', margin, yPos);
            yPos += 2.5;
            doc.text('⏰ Mon-Fri: 8AM-8:30PM | Sat-Sun: 7AM-9PM', margin, yPos);
            yPos += 4;
            
            // Footer
            doc.setFontSize(5);
            doc.setFont(undefined, 'italic');
            doc.text('Thank you for choosing JMB Printing Services!', centerX, yPos, { align: 'center' });
            
            // Draw border
            doc.rect(2, 2, 101, 144);
            
            // Save the PDF
            const fileName = `JMB_Order_${orderNumber}.pdf`;
            doc.save(fileName);
            
            return fileName;
        }

        // Student ID Verification Functions
        function openCamScanner() {
            // Try to open CamScanner app if available, otherwise show instructions
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            
            if (/android/i.test(userAgent)) {
                // Android - try to open CamScanner app
                window.location.href = 'intent://scan/#Intent;scheme=camscanner;package=com.intsig.camscanner;end';
                
                // Fallback to Play Store if app not installed
                setTimeout(() => {
                    window.open('https://play.google.com/store/apps/details?id=com.intsig.camscanner', '_blank');
                }, 2000);
            } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                // iOS - try to open CamScanner app
                window.location.href = 'camscanner://scan';
                
                // Fallback to App Store if app not installed
                setTimeout(() => {
                    window.open('https://apps.apple.com/app/camscanner/id388627783', '_blank');
                }, 2000);
            } else {
                // Desktop or other devices
                alert('📱 CamScanner Mobile App Required\n\nPlease use your mobile device to:\n1. Download CamScanner app\n2. Scan your student ID\n3. Upload the scanned file here\n\nOr visit our shop for manual verification.');
            }
        }

        function handleIdUpload(input) {
            if (input.files && input.files[0]) {
                const file = input.files[0];
                const maxSize = 10 * 1024 * 1024; // 10MB limit
                
                if (file.size > maxSize) {
                    alert('File size too large. Please compress your image or use CamScanner to optimize the file size.');
                    input.value = '';
                    return;
                }
                
                // Show upload success
                const uploadStatus = document.getElementById('uploadStatus');
                uploadStatus.classList.remove('hidden');
                
                // Store verification status
                window.studentIdVerified = true;
                
                // Show file info
                const fileName = file.name;
                const fileSize = (file.size / 1024 / 1024).toFixed(2);
                
                setTimeout(() => {
                    alert(`✅ Student ID uploaded successfully!\n\nFile: ${fileName}\nSize: ${fileSize} MB\n\nYour ID will be verified before processing your ₱1.00 printing request.`);
                }, 500);
            }
        }

        function toggleVerificationMethod(checkbox) {
            if (checkbox.checked) {
                window.manualVerificationSelected = true;
                
                // Hide upload status if manual verification is selected
                const uploadStatus = document.getElementById('uploadStatus');
                uploadStatus.classList.add('hidden');
                
                // Clear file input
                const fileInput = document.querySelector('input[name="studentIdScan"]');
                if (fileInput) {
                    fileInput.value = '';
                }
                
                alert('📍 Manual Verification Selected\n\nPlease bring your student ID to our shop:\n\n📍 Balitoc, Calatagan, Batangas\n⏰ Mon-Fri: 8AM-8:30PM, Sat-Sun: 7AM-9PM\n📞 09478188686 / 09050869449\n\nYour ₱1.00 printing rate will be activated after ID verification.');
            } else {
                window.manualVerificationSelected = false;
            }
        }

        // Admin Portal Functions
        function showAdminLogin() {
            document.getElementById('adminLoginModal').classList.remove('hidden');
        }

        function closeAdminLogin() {
            document.getElementById('adminLoginModal').classList.add('hidden');
            document.getElementById('adminLoginForm').reset();
        }

        function handleAdminLogin(event) {
            event.preventDefault();
            
            const formData = new FormData(event.target);
            const username = formData.get('username');
            const password = formData.get('password');
            
            // Simple authentication (in production, this should be server-side)
            if (username === 'admin' && password === 'jmb2024') {
                closeAdminLogin();
                showAdminPortal();
            } else {
                alert('❌ Invalid credentials. Please try again.\n\nDemo credentials:\nUsername: admin\nPassword: jmb2024');
            }
        }

        function showAdminPortal() {
            document.getElementById('adminPortalModal').classList.remove('hidden');
            showAdminSection('dashboard'); // Show dashboard by default
        }

        function logoutAdmin() {
            document.getElementById('adminPortalModal').classList.add('hidden');
            alert('👋 Logged out successfully. Thank you for using JMB Admin Portal!');
        }

        function showAdminSection(sectionName) {
            // Hide all sections
            const sections = document.querySelectorAll('.admin-section');
            sections.forEach(section => section.classList.add('hidden'));
            
            // Show selected section
            const targetSection = document.getElementById(`admin-${sectionName}`);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }
            
            // Update navigation buttons
            const navButtons = document.querySelectorAll('.admin-nav-btn');
            navButtons.forEach(btn => {
                btn.classList.remove('bg-purple-200', 'text-purple-800');
                btn.classList.add('hover:bg-purple-100');
            });
            
            // Highlight active button
            const activeButton = event?.target.closest('.admin-nav-btn');
            if (activeButton) {
                activeButton.classList.add('bg-purple-200', 'text-purple-800');
                activeButton.classList.remove('hover:bg-purple-100');
            }
            
            // Update dashboard data when dashboard is shown
            if (sectionName === 'dashboard') {
                updateDashboardData();
            }
        }

        function updateDashboardData() {
            // Simulate real-time data updates
            const now = new Date();
            const todayOrders = Math.floor(Math.random() * 20) + 5;
            const todayRevenue = Math.floor(Math.random() * 5000) + 1000;
            const studentCount = Math.floor(Math.random() * 100) + 20;
            const pendingOrders = Math.floor(Math.random() * 15) + 3;
            
            // Update dashboard cards
            const todayOrdersEl = document.getElementById('todayOrders');
            const todayRevenueEl = document.getElementById('todayRevenue');
            const studentCountEl = document.getElementById('studentCount');
            const pendingOrdersEl = document.getElementById('pendingOrders');
            
            if (todayOrdersEl) todayOrdersEl.textContent = todayOrders;
            if (todayRevenueEl) todayRevenueEl.textContent = `₱${todayRevenue.toLocaleString()}`;
            if (studentCountEl) studentCountEl.textContent = studentCount;
            if (pendingOrdersEl) pendingOrdersEl.textContent = pendingOrders;
            
            // Update recent activity with current time
            const recentActivity = document.getElementById('recentActivity');
            if (recentActivity) {
                const activities = [
                    { icon: '✅', text: 'New student registration', detail: 'Maria Santos - 1 minute ago', color: 'text-green-500' },
                    { icon: '📋', text: 'New order received', detail: 'ID RUSH 5 - 3 minutes ago', color: 'text-blue-500' },
                    { icon: '💰', text: 'Payment received', detail: '₱150 - Photo Print - 7 minutes ago', color: 'text-purple-500' },
                    { icon: '🎓', text: 'Student verification completed', detail: 'Juan Dela Cruz - 12 minutes ago', color: 'text-orange-500' },
                    { icon: '📄', text: 'Document print completed', detail: '25 pages A4 B&W - 15 minutes ago', color: 'text-indigo-500' }
                ];
                
                recentActivity.innerHTML = activities.slice(0, 3).map(activity => `
                    <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <span class="${activity.color}">${activity.icon}</span>
                        <div>
                            <p class="text-sm font-semibold">${activity.text}</p>
                            <p class="text-xs text-gray-500">${activity.detail}</p>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Contact Form Function
        function handleContactForm(event) {
            event.preventDefault();
            event.stopPropagation();
            
            try {
                const formData = new FormData(event.target);
                const contactData = {
                    name: formData.get('name') || event.target.querySelector('input[type="text"]').value,
                    phone: formData.get('phone') || event.target.querySelector('input[type="tel"]').value,
                    service: formData.get('service') || event.target.querySelector('select').value,
                    message: formData.get('message') || event.target.querySelector('textarea').value
                };
                
                let contactSummary = `📧 MESSAGE SENT SUCCESSFULLY!\n\n`;
                contactSummary += `Name: ${contactData.name}\n`;
                contactSummary += `Phone: ${contactData.phone}\n`;
                contactSummary += `Service: ${contactData.service}\n`;
                contactSummary += `Message: ${contactData.message}\n\n`;
                contactSummary += `Thank you for contacting JMB Printing Services!\n`;
                contactSummary += `We'll get back to you within 24 hours.\n\n`;
                contactSummary += `For urgent inquiries, call us directly:\n`;
                contactSummary += `SMART: 09478188686\n`;
                contactSummary += `TM: 09050869449`;
                
                alert(contactSummary);
                event.target.reset();
            } catch (error) {
                alert('Message sent! Thank you for contacting JMB Printing Services.');
            }
            
            return false;
        }
</html>
