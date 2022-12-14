import * as Yup from 'yup';

export const ContactSchema = Yup.object().shape({
    fullname: Yup.string().required("نام و نام خانوادگی الزمامی می باشد"),
    photo:Yup.string().url("آدرس معتبر نیست").required("تصویر مخاطب الزامی می باشد"),
    mobile: Yup.number().required("شماره موبایل الزامی می باشد") ,
    email: Yup.string().email("آدرس ایمیل معتبر نیست").required("آدرس ایمیل الزامی می باشد"),
    job: Yup.string().nullable() ,
    group: Yup.string().required("انتخاب گروه الزامی می باشد")

});