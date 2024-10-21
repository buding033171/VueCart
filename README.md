![image](https://github.com/user-attachments/assets/f38706ef-b047-432a-a1b9-ce140543d203)
![image](https://github.com/user-attachments/assets/f8d2138d-ff5b-4585-88ab-8cbda1860951)
![image](https://github.com/user-attachments/assets/936e7794-3f65-48b5-be06-9645c6520b85)

## VueCart 是一個使用 Vue 3 和 Vite 建立的前端項目，旨在提供響應式且動態的購物車體驗。

- **專案的運行方式**

```
npm install
安裝專案所需要的套件

npm run dev
啟動後，你可以在瀏覽器中訪問 http://localhost:5173/ 。

npm run build
壓縮打包
```

```
優惠碼測試:
            {
                code: "SAVE10",
                type: "percentage",
                value: 10,
            },
            {
                code: "SAVE20",
                type: "percentage",
                value: 20,
            },
            {
                code: "MINUS100",
                type: "fixed",
                value: 100,
            },
            {
                code: "MINUS500",
                type: "fixed",
                value: 500,
            }
        ],
```

進入http://localhost:5173/ 後，對商品點選加入購物車後商品會加入至下方的購物車，商品可以點選+號或
-號做新增減少，移除商品也會有警告是否要移除。最後下方有優惠碼可以輸入分別有百分比折扣跟固定折扣，折
扣輸入後會更新旁邊的總價，點選結帳後會彈出商品詳細視窗如有輸入優惠碼也會顯示。

- **實現思路**
  
購物車功能：購物車使用 Pinia 管理狀態，包括商品數量、總金額、折扣等狀態。
折扣碼：有分百分比折扣與固定金額折扣，使用者可以輸入折扣碼進行驗證，折扣會套用到購物車的總價中。

- **使用的主要技術**

  Vue 3：用於建立使用者介面的漸進式 JavaScript 框架。  
  Vite：現代 Web 開發的快速建置工具。  
  Pinia：使用 Pinia 進行購物車的狀態管理。

- **遇到的挑戰和解決方案**

我希望將商品資訊和優惠碼存在一個檔案中，並把購物車和商品列表分成兩個檔案，讓需要時可以抓取資料。遇到跨元件狀態更新的問題後，我發現 Pinia 狀態管理工具可以實現資料傳遞和內建方法。最後，我透過 Pinia 和 useCartStore 成功實現了跨元件的狀態共享和管理。
