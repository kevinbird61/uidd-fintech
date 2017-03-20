var total_width = $('#icons-frame').offsetWidth;
var total_height = $('#icons-frame').offsetHeight;

/* Icons animation */
var svg = d3.select('#icons-frame')
    .append("svg")
    .attr('width', '100%')
    .attr('height', '100%');

// Define all icons
var icons_data = [
    { 'x': 136, 'y': 410, 'id': 'facebook', 'label': '\uf09a' },
    { 'x': 161.5, 'y': 475, 'id': 'youtube', 'label': '\uf167' },
    { 'x': 198.7, 'y': 530, 'id': 'linkedin', 'label': '\uf0e1' },
    { 'x': 248.5, 'y': 580, 'id': 'twitter', 'label': '\uf099' }
];

// Define all icons' path
var icons_path = [
    [
        [136, 410],
        [136, 410],
        [136, 410],
    ],
    [
        [136, 410],
        [149.1, 449],
        [161.6, 475]
    ],
    [
        [161.6, 475],
        [180.1, 508],
        [198.7, 530]
    ],
    [
        [198.7, 530],
        [218.4, 553],
        [248.5, 580]
    ]
];

// Define curved line path
var path_data = [
    [120, 340],
    [136, 410],
    [161.6, 475],
    [198.7, 530],
    [248.5, 580],
    [310, 630]
];

var curve = d3.svg.line()
    .x(function(d) {
        return d[0];
    })
    .y(function(d) {
        return d[1];
    })
    .tension(0)
    .interpolate('basis');

// Draw curved line in animation
var curve_path = svg.selectAll('path')
    .data([path_data])
    .enter()
    .append('path')
    .attr('d', curve)
    .attr('stroke', '#4298CC')
    .attr('stroke-width', 2.25)
    .attr('fill', 'none')
    .attr('id', function(d, i) {
        return 'path' + i;
    })
    .transition()
    .duration(2000)
    .attrTween('stroke-dasharray', function() {
        var len = this.getTotalLength();
        return function(t) {
            return d3.interpolateString('0,' + len, len + ',0')(t);
        };
    });


// Draw all icons
var icon_group = svg.selectAll('g')
    .data(icons_path)
    .enter()
    .append('g');

var icon_path = icon_group
    .append('path')
    .attr('fill', 'none')
    .attr('d', curve);

var icon = icon_group.selectAll('a')
    .data([icons_data])
    .enter()
    .append('a')
    .attr('class', 'icon')
    .attr('id', function(d, i, j) {
        return d[j].id;
    });

icon.append('circle')
    .attr('id', function(d, i, j) {
        return d[j].id;
    })
    .attr('fill', '#4298CC')
    .attr('r', 27)
    .attr('transform', function(d, i, j) {
        return 'translate(' + d[j].x + ', ' + d[j].y + ')';
    })
    .style('opacity', 0)
    .transition()
        .duration(500)
        .delay(function(d, i, j) {
            return j * 1000;
        })
    .transition()
        .ease('linear')
        .duration(500)
        .delay(function(d, i, j) {
            if (this.id == 'facebook') {
                return j * 500 + 1000;
            }
            return j * 500 + 1500;
        })
        .attrTween('transform', createPathTween)
    .style('opacity', 1);


icon.append('text')
    .attr('id', function(d, i, j) {
        return d[j].id;
    })
    .attr('transform', function(d, i, j) {
        return 'translate(' + d[j].x + ',' + d[j].y + ')';
    })
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .attr('font-family', 'FontAwesome')
    .attr('font-size', '2.2rem')
    .attr('fill', 'white')
    .text(function(d, i, j) {
        return d[j].label;
    })
    .style('opacity', 0)
        .transition()
        .duration(1000)
        .delay(function(d, i, j) {
            if (this.id == 'facebook') {
                return j * 500 + 1000;
            }
            return j * 500 + 1500;
        })
        .style('opacity', 1);


function createPathTween(d, i, j) {
    var path = this.parentNode.parentNode.getElementsByTagName('path')[0];
    var l = path.getTotalLength();
    return function(t) {
        var p = path.getPointAtLength(t * l);
        return 'translate(' + p.x + ',' + p.y + ')';
    };
}
