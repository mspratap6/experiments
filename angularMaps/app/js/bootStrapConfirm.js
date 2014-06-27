/* BootstrapConfirmBox
 * Uses:
 *      BootstrapConfirmBox.show([options]);
 *          Show Bootstrap Confirmation Dialogbox.
 *          where options:
 *              contentHtml: Html content. this can be any angular binding also so tht it will update by server..
 *              yesCallBack: call Back metho to be called if user selected yes
 *              noCallBack:  callback method to be called if user selected no.
 */


var BootstrapConfirmBox;
BootstrapConfirmBox = BootstrapConfirmBox || (function () {
    var options = {        
        contentHtml: 'Do You Want To Continew.',
        yesCallBack: function(){
            console.log("yes Selected");
        },
        noCallBack: function(){
            console.log ("no selected");
        }
    };
    var showing = false;
    var div = {};

    var getDiv = function () {
        return $(
            '<div class="modal fade" id="mod-success" tabindex="-1" role="dialog">'+
            '<div class="modal-dialog">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<div class="text-center">'+
                            '<div class="i-circle success"><i class="fa fa-question"></i></div>'+
                            options.contentHtml +
                        '</div>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<button type="button" class="btn btn-default" data-dismiss="modal" id="bootstrapConfirmBox-no">No</button>'+
                        '<button type="button" class="btn btn-success" data-dismiss="modal" id="bootstrapConfirmBox-yes">Yes</button>'+
                    '</div>'+
                '</div><!-- /.modal-content -->'+
            '</div><!-- /.modal-dialog -->'+
        '</div>');
    };
    return {
        show: function (opt) {
            if (showing) {
                return 'alreadyShowing';
            }

            if (!opt) {
                opt = options;
            }

            options.title = opt.title || options.title;
            options.contentHtml = opt.contentHtml || options.contentHtml;
            options.noCallBack = opt.noCallBack || options.noCallBack;
            options.yesCallBack = opt.yesCallBack || options.yesCallBack;

            div = getDiv();
            $('#bootstrapConfirmBox-no').val("jai ho kahani.");
            $('#bootstrapConfirmBox-no').on('click',function (){
                console.log("Testing");
            });
            $('#bootstrapConfirmBox-yes').click(function (){
                console.log("Testing");
            });
            div.modal();
            showing = true;
            div.modal('show');
        },
        hide: function () {
            div.modal('hide');
            showing = false;
        },
    };
})();