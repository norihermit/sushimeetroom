document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#vForm").addEventListener("submit", function (e) {
      e.preventDefault();  // 阻止默認的表單提交行為
      const form = e.target;
      const formData = new FormData(form);
      fetch("/vdata", {
        method: "POST",
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        // 在此處理回應資料，可以顯示成功消息或執行其他操作
        if (!data || data.length === 0) {
          // 如果沒有數據，顯示相應消息
          const MessageLabel = document.getElementById("message2");
          MessageLabel.innerHTML = "當日無預約資料";
        } else {
          // 將數據轉換為表格
          const table = convertDataToTable(data);
          // 顯示表格
          const MessageLabel = document.getElementById("message2");
          MessageLabel.innerHTML = table;
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
    });
  
    // 這是一個示例函數，將數據轉換為表格
    function convertDataToTable(data) {
      let table = "<table border='1'>";
      table += "<tr><th>預約開始時間</th><th>預約結束時間</th><th>員工號碼</th><th>會議室</th></tr>";
  
      data.forEach((item, index) => {
        const rowClass = index % 2 === 0 ? "even" : "odd";
        const startDate = new Date(item['r_start']).toLocaleString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false });
        const endDate = new Date(item['r_end']).toLocaleString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false });
    
        table += `<tr class='${rowClass}'>`;
        table += `<td>${startDate}</td><td>${endDate}</td><td>${item['c_id']}</td><td>${item['room_no']}</td>`;
        table += "</tr>";
      });
    
      table += "</table>";
      return table;
    }
  });