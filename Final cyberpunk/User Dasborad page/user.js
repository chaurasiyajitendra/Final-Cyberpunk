        // Load saved profile picture on page load
        window.addEventListener('load', function() {
            const savedProfilePic = localStorage.getItem('profilePicture');
            if (savedProfilePic) {
                document.getElementById('profilePic').src = savedProfilePic;
            }
            
            // Load saved licenses from localStorage
            loadSavedLicenses();
        });

        // Profile picture upload functionality
        function updateProfilePicture(input) {
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const profilePicUrl = e.target.result;
                    document.getElementById('profilePic').src = profilePicUrl;
                    localStorage.setItem('profilePicture', profilePicUrl);
                    showNotification('Profile picture updated successfully');
                }
                
                reader.readAsDataURL(input.files[0]);
            }
        }

        // License management functionality
        function openLicenseModal(licenseId) {
            const licenseCard = document.querySelector(`[data-license-id="${licenseId}"]`);
            const modal = document.getElementById('licenseModal');
            
            document.getElementById('licenseId').value = licenseId;
            document.getElementById('softwareName').value = licenseCard.querySelector('h4').textContent;
            document.getElementById('licenseKey').value = licenseCard.querySelector('.license-key').textContent;
            document.getElementById('expiryDate').value = licenseCard.querySelector('.expiry').textContent;
            
            modal.style.display = 'block';
        }

        function closeLicenseModal() {
            document.getElementById('licenseModal').style.display = 'none';
        }

        function deactivateDevice() {
            // Implement device deactivation logic here
            showNotification('Device deactivated successfully');
            closeLicenseModal();
        }

        function loadSavedLicenses() {
            // Implement license loading logic here
        }

        function showNotification(message) {
            const notification = document.createElement('div');
            notification.className = 'success-message';
            notification.textContent = message;
            document.body.appendChild(notification);
            notification.style.display = 'block';

            setTimeout(() => {
                notification.remove();
            }, 3000);
        }