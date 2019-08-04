export default (err) => {
    const response = err.response || undefined;
    if (err.message == "Network Error") {
        return ({
            type: 'question',
            text: 'Нет доступа связи к серверу данных!'
        });
    } 
    else if(response) {
        if (response.status == 400) {
            try {
                const msg = JSON.parse(response.data.message);
                let html = "";
                for(let item of msg["validator"]) {
                    html += `${item.msg} </br>`;
                }
                return ({
                    type: 'error',
                    html
                })
            } catch (error) {
                return ({
                    type: 'error',
                    text: response.data.message || "Плохой, неверный запрос!"
                })
            }
        } else if (response.data.error == "Unauthorized") {
            return ({
                type: 'error',
                text: response.data.message || "Вы не прошли аутентификацию. Проверьте правильность ввода имени пользователя и пароля!"
            });
        } else if (response.status == 403) {
            return ({
                type: 'error',
                text: "У Вас отсутствуют права доступа к этому ресурсу!"
            });
        } else if (response.status == 404) {
            return ({
                type: 'question',
                text: response.data.message || "Ресурс не найден!"
            });
        } else if (response.status == 500) {
            return ({
                type: 'error',
                text: response.data.message || "Внутренняя ошибка сервера!"
            });
        } else {
            return ({
                type: 'error',
                text: response.data
            });
        }
    }
    return ({
        type: 'error',
        text: err || err.message
    });
}