import Customer from "@/models/Customer";

interface CTM {
    customer_id: string,
    customer_name: string,
    customer_phone: string,
    customer_address: string,
    customer_point: 0
}
export async function findAllCustomer() {
    try {
        const customers = Customer.find();
        return customers;
    } catch (err) {
        console.log(err);
        throw err
    }

}
export async function insertNewCustomer(customer: CTM) {
    try {
        const newCustomer = new Customer(customer);
        newCustomer.save();
        return true;
    } catch (err) {
        console.log(err);
        return "ເບີຊ້ຳກັນ"
    }

}
export async function findCustomerByID(id: string) {
    try {
        const customer = await Customer.findOne({ customer_id: id })
        return customer;
    } catch (err) {
        console.log(err);
        throw err
    }
}
export async function updateCustomerPoint(id: string, point: number) {
    try {
        const customer = await Customer.findByIdAndUpdate(
            id,
            { $inc: { customer_point: point } },
            { new: true }
        )
        return customer;
    } catch (err) {
        console.log(err);
        throw err
    }
}
export async function countCustomer() {
    try {
        const count = await Customer.countDocuments();
        return count;

    } catch (error) {
        console.log(error);
        throw error
    }

}
// ແກ້ເພີ່ມສິນຄ້າເຂົ້າກະຕ່າເກີນຈຳນວນ