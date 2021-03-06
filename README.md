### Проблема №1
Файлы `.jsx/.js`, использующие jsx разметку, которые не импортируются в тесты, при анализе покрытия кода не показываются в общем выводе в принципе. 
Однако если убрать jsx разметку или сделать тест, зависящий от такого файла, то в общем выводе покрытия кода данный файл покажется.
Соответствующий [ишью](https://github.com/istanbuljs/nyc/issues/1334#issuecomment-662253710) на данную тему

### Решение:
- дополнить `"parser-plugins"` в `package.json` раздела `nyc` согласно [файлу](https://github.com/SurkinK/ava-test-local/blob/master/package.json).

***

### Проблема №2
Если в проекте огромное количество тестов и нужно фиксануть покрытие 2-3 тестов, то приходится постоянно запускать npm run test, который запускает все тесты.
Возможен запуск тестов для определенной папки (запускаются тесты в данной папке и все тесты в подпапках + покрытие кода показывается только для данного уровня).

### Решение - 
- Обновить `"ava"` до версии "^3.11.1" (devDependencies);
- Поставить пакет `"@ava/babel"` (моя версия "^1.0.1") (devDependencies);
- В `package.json` в разделе `"scripts"` добавить новую команду `"test-local": "ava reset-cache && node localtest.js"`. Пример в [файле](https://github.com/SurkinK/ava-test-local/blob/master/package.json);
- В `package.json` в разделе `"scripts"` сменить `--reset-cache` на `reset-cache` у скриптов `test`, `update-snapshots` и `test-development`
- Рядом с `package.json` добавить файл `localtest.js` с содержимым согласно [файлу](https://github.com/SurkinK/ava-test-local/blob/master/localtest.js) 
- Убедись, что нода не меньше 12 версии

### Использование - 
- Перейти в любую папку и запустить `npm run test-local`, при этом запустятся только тесты для данной директории и покажется покрытие только для данной директории

### Предостережения - 
- Возможно будет проблема `timed out while running tests ava`, чтобы ее решить необходимо в `package.json` в разделе `"ava"` добавить `"timeout": "5m"`
- Возможно стоит объединить скрипты `npm test` и `npm run test-local` в один, однако `npm run test-local` не выбивает ошибку в консоли в конце вывода, в случае, если покрытие кода не 100% или зафейлились тесты
- В третьей аве t.throws получило [другую сигнатуру](https://github.com/avajs/ava/blob/master/docs/03-assertions.md#throwsfn-expectation-message) (второй аргумент объект, а не строка), поэтому некоторые тесты из папки wrappers будут фейлиться. 
[Пример исправления](https://i.imgur.com/Pp9Vpbx.png)

***
При наличии любых багов [просьба сообщать](https://t.me/kostyasu5)
