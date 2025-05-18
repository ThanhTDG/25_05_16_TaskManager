**Project:** TaskManager

### I. Sử dụng Class

Project TaskManager sử dụng các class TypeScript để định nghĩa cấu trúc dữ liệu, logic nghiệp vụ, và các thành phần giao diện người dùng.

1.  **Model Classes:**

    - **`Task`** (trong `src/models/task.model.ts`):
      - Đại diện cho một công việc (task) trong hệ thống.
      - Thuộc tính: `id`, `title`, `description`, `status` (kiểu `TaskStatus`), `createdAt`, `updatedAt`.
      - Phương thức: `constructor` để khởi tạo task, `static fromJson` để tạo instance từ dữ liệu JSON (thường dùng khi load từ localStorage).

2.  **Controller Classes:**

    - **`TaskManager`** (trong `src/controllers/taskManager.controller.ts`):
      - Quản lý logic nghiệp vụ chính liên quan đến tasks.
      - Tương tác với `TaskService` để thực hiện các thao tác CRUD.
      - Phương thức: `createTask`, `deleteTask`, `updateTask`, `updateStatus`, `getAllTasks`.
      - Hiện tại đang triển khai pattern Singleton thủ công thông qua `private constructor` và `static getInstance()`.

3.  **Service Classes:**

    - **`BaseService<T>`** (trong `src/services/base.service.ts`):
      - Một class cơ sở generic để cung cấp các thao tác CRUD cơ bản (create, getById, update, delete, getAll) và quản lý việc lưu/tải dữ liệu từ localStorage.
      - Sử dụng một `factory` function để chuyển đổi dữ liệu thô từ localStorage thành instance của model cụ thể.
    - **`TaskService`** (trong `src/services/task.service.ts`):
      - Kế thừa từ `BaseService<Task>`.
      - Chuyên xử lý việc lưu trữ và truy xuất dữ liệu cho `Task`.
      - Khởi tạo dữ liệu mẫu (`taskData`) nếu localStorage trống.
      - Hiện tại đang triển khai pattern Singleton thủ công.

4.  **React Component Classes (Functional Components với Hooks):**
    - Project sử dụng functional components của React, về bản chất là các hàm nhưng đóng vai trò như các "class" trong việc định nghĩa UI.
    - Ví dụ:
      - `App`: Component gốc của ứng dụng.
      - `TaskManagerView`: Component chính hiển thị giao diện quản lý task.
      - `ListTaskComponent`: Hiển thị danh sách các `TaskCard`.
      - `TaskCard`: Hiển thị thông tin chi tiết của một task và các hành động liên quan.
      - `TaskForm`: Form để tạo hoặc cập nhật task.
      - `DialogTask`: Dialog chung để hiển thị `TaskForm` cho việc tạo/cập nhật task.

### II. Sử dụng Decorator

Decorators trong TypeScript cung cấp một cách để thêm metadata hoặc sửa đổi hành vi của class, method, property, hoặc parameter.

1.  **Class Decorator:**

    - **`Singleton`** (trong `src/pattern/singleton.pattern.ts`):
      - Mục đích: Đảm bảo một class chỉ có một instance duy nhất.
      - Cách hoạt động: Nhận constructor của class và trả về một class mới (hoặc sửa đổi class hiện tại) để kiểm soát việc tạo instance.
      - **Ứng dụng đề xuất:** Có thể áp dụng decorator `@Singleton` cho class `TaskManager` và `TaskService` để thay thế việc triển khai Singleton thủ công, giúp code gọn gàng hơn.
        ```typescript
        // Ví dụ áp dụng cho TaskManager
        // import { Singleton } from "../pattern/singleton.pattern";
        // @Singleton
        // export class TaskManager { ... }
        ```

2.  **Property Decorator:**

    - **`DefaultStatus`** (trong `src/enum/taskStatus.enum.ts`):
      - Mục đích: Thiết lập một giá trị mặc định cho một property của class, cụ thể ở đây là `status` của `Task`.
      - Cách hoạt động: Sử dụng `Object.defineProperty` để định nghĩa getter và setter cho property, với giá trị ban đầu được cung cấp cho decorator.
      - **Ứng dụng:** Có thể áp dụng cho thuộc tính `status` trong class `Task` (`src/models/task.model.ts`) để tự động gán `TaskStatus.PENDING` nếu không có giá trị nào khác được cung cấp khi khởi tạo.

3.  **Các loại Decorator khác (Method, Parameter, Decorator Factory):**
    - Hiện tại, project chưa sử dụng các loại decorator này.
    - **Đề xuất ứng dụng:**
      - **Method Decorator:**
        - `@LogCall`: Ghi log mỗi khi một phương thức quan trọng (ví dụ: `createTask`, `updateTask` trong `TaskManager`) được gọi, bao gồm tham số và kết quả trả về.
        - `@MeasureTime`: Đo thời gian thực thi của các phương thức có thể tốn hiệu năng.
      - **Parameter Decorator:**
        - `@Required`: Đánh dấu các tham số bắt buộc cho phương thức, kết hợp với một method decorator `@ValidateRequiredParameters` để tự động kiểm tra.
      - **Decorator Factory:**
        - Cho phép tạo ra các decorator có thể tùy chỉnh bằng tham số (ví dụ: `@LogCallWithLevel('DEBUG')`).

### III. Sử dụng Module

Project sử dụng hệ thống module ES6 của JavaScript/TypeScript để tổ chức code thành các file riêng biệt, dễ quản lý và tái sử dụng.

1.  **Cấu trúc Module:**

    - Mỗi file `.ts` hoặc `.tsx` trong project được coi là một module.
    - Sử dụng `export` để cho phép các thành phần (class, function, enum, const, interface) trong một module được sử dụng bởi các module khác.
    - Sử dụng `import` để sử dụng các thành phần đã được export từ các module khác.

2.  **Tổ chức thư mục như các Module logic:**

    - **`controllers`**: Chứa các class quản lý logic nghiệp vụ (ví dụ: `taskManager.controller.ts`).
    - **`datas`**: Chứa dữ liệu mẫu (ví dụ: `task.data.ts`).
    - **`enum`**: Chứa các định nghĩa enum (ví dụ: `taskStatus.enum.ts`).
    - **`models`**: Chứa các class định nghĩa cấu trúc dữ liệu (ví dụ: `task.model.ts`).
    - **`pattern`**: Chứa các triển khai design pattern (ví dụ: `singleton.pattern.ts`).
    - **`services`**: Chứa các class xử lý việc truy cập và quản lý dữ liệu (ví dụ: `task.service.ts`, `base.service.ts`).
    - **`views`**: Chứa các React components định nghĩa giao diện người dùng.
      - **`components`**: Các component con, tái sử dụng được (ví dụ: `task.component.tsx`, `form.component.tsx`).
    - **utils.ts**: Chứa các hàm tiện ích chung.

3.  **Lợi ích:**
    - **Tính đóng gói (Encapsulation):** Che giấu chi tiết triển khai bên trong module.
    - **Tái sử dụng (Reusability):** Các module có thể được import và sử dụng ở nhiều nơi.
    - **Dễ bảo trì (Maintainability):** Thay đổi trong một module ít ảnh hưởng đến các module khác nếu interface (phần được export) không đổi.
    - **Tổ chức code rõ ràng:** Giúp dễ dàng tìm kiếm và hiểu code.
