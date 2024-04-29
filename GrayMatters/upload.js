document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById("fileElem");
    const gallery = document.getElementById("gallery");
  
    fileInput.addEventListener('change', function(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        displayFileIcon(files[i]);
      }
    });
  
    function displayFileIcon(file) {
      // إنشاء عنصر ليستة جديد لكل ملف
      const listItem = document.createElement('li');
      listItem.className = 'in-prog';
  
      // إضافة أيقونة للملف بدلاً من الصورة
      const iconDiv = document.createElement('div');
      iconDiv.className = 'file-icon';
      const icon = document.createElement('i');
      icon.className = 'fas fa-file-image'; // أيقونة تمثل الصورة
      iconDiv.appendChild(icon);
      listItem.appendChild(iconDiv);
  
      // إضافة اسم الملف
      const nameDiv = document.createElement('div');
      nameDiv.className = 'name';
      nameDiv.textContent = file.name;
      listItem.appendChild(nameDiv);
  
      // إضافة حجم الملف
      const sizeDiv = document.createElement('div');
      sizeDiv.className = 'size';
      sizeDiv.textContent = (file.size / 1024).toFixed(2) + ' KB';
      listItem.appendChild(sizeDiv);
  
      // إضافة العنصر إلى القائمة في الواجهة الرسومية
      gallery.appendChild(listItem);
    }
  });
  document.addEventListener('DOMContentLoaded', function() {
    const dropArea = document.getElementById('drop-area'); // تأكد من وجود هذا العنصر في HTML
  
    dropArea.addEventListener('dragover', function(event) {
      event.preventDefault();
      dropArea.classList.add('highlight'); // إضافة تسليط الضوء
    });
  
    dropArea.addEventListener('drop', function(event) {
      event.preventDefault();
      dropArea.classList.remove('highlight'); // إزالة تسليط الضوء
      const files = event.dataTransfer.files;
      handleFiles(files);
    });
  
    function handleFiles(files) {
      for (let i = 0; i < files.length; i++) {
        displayFileIcon(files[i]);
      }
    }
  
    function displayFileIcon(file) {
      const gallery = document.getElementById('gallery');
      const listItem = document.createElement('li');
      listItem.textContent = file.name; // فقط كمثال لعرض اسم الملف
      gallery.appendChild(listItem);
    }
  });
  