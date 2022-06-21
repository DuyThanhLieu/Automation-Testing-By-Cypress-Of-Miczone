/// <reference types="cypress" />

// Chào mừng bạn đến với Cypress!
//
// Tệp thông số kỹ thuật này chứa nhiều bài kiểm tra mẫu khác nhau
// cho một ứng dụng danh sách việc cần làm được thiết kế để chứng minh
// sức mạnh của việc viết các bài kiểm tra trong Cypress.
//
// Để tìm hiểu thêm về cách Cypress hoạt động và
// điều gì khiến nó trở thành một công cụ kiểm tra tuyệt vời như vậy,
// vui lòng đọc hướng dẫn bắt đầu của chúng tôi:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress bắt đầu với một phương tiện chặn trống cho mỗi bài kiểm tra
    // vì vậy chúng ta phải yêu cầu nó truy cập trang web của chúng ta bằng lệnh `cy.visit ()`.
    // Vì chúng tôi muốn truy cập cùng một URL khi bắt đầu tất cả các thử nghiệm của mình,
    // chúng tôi đưa nó vào hàm beforeEach của chúng tôi để nó chạy trước mỗi lần kiểm tra
    cy.visit('https://example.cypress.io/todo')
  })

  it('displays two todo items by default', () => {
    // Chúng tôi sử dụng lệnh `cy.get ()` để lấy tất cả các phần tử phù hợp với bộ chọn.
    // Sau đó, chúng tôi sử dụng `should` để khẳng định rằng có hai mục phù hợp,
    // là hai mục mặc định.
    cy.get('.todo-list li').should('have.length', 2)

    // Chúng ta có thể đi xa hơn nữa và kiểm tra xem các việc cần làm mặc định của mỗi
    // văn bản chính xác. Chúng tôi sử dụng các chức năng `đầu tiên` và` cuối cùng`
    // để chỉ lấy các phần tử phù hợp đầu tiên và cuối cùng riêng lẻ,
    // và sau đó thực hiện một khẳng định với `should`.
    cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
    cy.get('.todo-list li').last().should('have.text', 'Walk the dog')
  })

  it('can add new todo items', () => {
   // Chúng tôi sẽ lưu trữ văn bản mục của chúng tôi trong một biến để chúng tôi có thể sử dụng lại nó
    const newItem = 'Feed the cat'

   // Hãy lấy phần tử đầu vào và sử dụng lệnh `type` để
    // nhập mục danh sách mới của chúng tôi. Sau khi nhập nội dung của mục của chúng tôi,
    // chúng ta cũng cần gõ phím enter để gửi dữ liệu đầu vào.
    // Đầu vào này có thuộc tính data-test, vì vậy chúng tôi sẽ sử dụng thuộc tính đó để chọn
    // phần tử phù hợp với các phương pháp hay nhất:
    // https://on.cypress.io/selecting-elements
    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

    // Bây giờ chúng ta đã nhập mục mới của mình, hãy kiểm tra xem nó đã thực sự được thêm vào danh sách chưa.
    // Vì là mục mới nhất, nên nó sẽ tồn tại dưới dạng phần tử cuối cùng trong danh sách.
    // Ngoài ra, với hai mục mặc định, chúng ta nên có tổng cộng 3 phần tử trong danh sách.
    // Vì các xác nhận mang lại phần tử được xác nhận trên,
    // chúng ta có thể xâu chuỗi cả hai khẳng định này lại với nhau thành một câu lệnh duy nhất.
    cy.get('.todo-list li')
      .should('have.length', 3)
      .last()
      .should('have.text', newItem)
  })

  it('can check off an item as completed', () => {
   // Ngoài việc sử dụng lệnh `get` để lấy một phần tử bằng bộ chọn,
    // chúng ta cũng có thể sử dụng lệnh `contains` để lấy một phần tử theo nội dung của nó.
    // Tuy nhiên, điều này sẽ mang lại <label>, là phần tử cấp thấp nhất chứa văn bản.
    // Để kiểm tra mặt hàng, chúng ta sẽ tìm phần tử <input> cho <label> này
    // bằng cách duyệt qua dom tới phần tử mẹ. Từ đó, chúng ta có thể `tìm thấy '
    // phần tử <input> hộp kiểm con và sử dụng lệnh `check` để kiểm tra nó.
    cy.contains('Pay electric bill')
      .parent()
      .find('input[type=checkbox]')
      .check()

    // Bây giờ chúng ta đã kiểm tra nút, chúng ta có thể tiếp tục và đảm bảo
    // rằng phần tử danh sách bây giờ được đánh dấu là đã hoàn thành.
    // Một lần nữa, chúng ta sẽ sử dụng `contains` để tìm phần tử <label> và sau đó sử dụng lệnh` parent`
    // để chuyển nhiều cấp lên dom cho đến khi chúng tôi tìm thấy phần tử <li> tương ứng.
    // Khi chúng ta nhận được phần tử đó, chúng ta có thể khẳng định rằng nó có lớp đã hoàn thành.
    cy.contains('Pay electric bill')
      .parents('li')
      .should('have.class', 'completed')
  })

  context('with a checked task', () => {
    beforeEach(() => {
      // Chúng tôi sẽ sử dụng lệnh mà chúng tôi đã sử dụng ở trên để kiểm tra một phần tử
      // Vì chúng tôi muốn thực hiện nhiều kiểm tra bắt đầu bằng kiểm tra
      // một phần tử, chúng tôi đặt nó trong hook beforeEach
      // để nó chạy khi bắt đầu mọi thử nghiệm.
      cy.contains('Pay electric bill')
        .parent()
        .find('input[type=checkbox]')
        .check()
    })

    it('can filter for uncompleted tasks', () => {
     // Chúng tôi sẽ nhấp vào nút "hoạt động" để
      // chỉ hiển thị các mục chưa hoàn thành
      cy.contains('Active').click()

// Sau khi lọc, chúng ta có thể khẳng định rằng chỉ có một
      // mục chưa hoàn thành trong danh sách.
      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Walk the dog')

      // Để có biện pháp tốt, chúng ta cũng hãy khẳng định rằng tác vụ chúng ta đã kiểm tra
      // không tồn tại trên trang.
      cy.contains('Pay electric bill').should('not.exist')
    })

    it('can filter for completed tasks', () => {
      // Chúng ta có thể thực hiện các bước tương tự như kiểm tra ở trên để đảm bảo
      // chỉ những tác vụ đã hoàn thành mới được hiển thị
      cy.contains('Completed').click()

      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Pay electric bill')

      cy.contains('Walk the dog').should('not.exist')
    })

    it('can delete all completed tasks', () => {
      // Đầu tiên, chúng ta hãy nhấp vào nút "Hoàn thành xóa"
      // `chứa` thực sự phục vụ hai mục đích ở đây.
      // Đầu tiên, nó đảm bảo rằng nút tồn tại trong dom.
      // Nút này chỉ xuất hiện khi ít nhất một tác vụ được chọn
      // vì vậy lệnh này đang ngầm xác minh rằng nó có tồn tại hay không.
      // Thứ hai, nó chọn nút để chúng ta có thể nhấp vào nó.
      cy.contains('Clear completed').click()

     // Sau đó, chúng ta có thể đảm bảo rằng chỉ có một phần tử
      // trong danh sách và phần tử của chúng tôi không tồn tại
      cy.get('.todo-list li')
        .should('have.length', 1)
        .should('not.have.text', 'Pay electric bill')

      // Cuối cùng, đảm bảo rằng nút xóa không còn tồn tại.
      cy.contains('Clear completed').should('not.exist')
    })
  })
})
